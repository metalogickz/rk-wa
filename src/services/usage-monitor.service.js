const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');
const os = require('os');
const whatsappManager = require('./whatsapp-manager.service');

const prisma = new PrismaClient();

class UsageMonitorService {
  constructor() {
    this.instanceMetrics = new Map();
  }

  // Инициализация отслеживания метрик для инстанса
  initInstanceMetrics(instanceId) {
    if (!this.instanceMetrics.has(instanceId)) {
      logger.debug(`Initializing metrics for instance ${instanceId}`);
      this.instanceMetrics.set(instanceId, {
        messagesSent: 0,
        messagesReceived: 0,
        mediaSent: 0,
        mediaReceived: 0,
        mediaSize: 0,
        apiCalls: 0,
        webhookCalls: 0,
        startTime: Date.now()
      });
    }
  }

  // Регистрация метрики для инстанса
  trackMetric(instanceId, metric, value = 1) {
    this.initInstanceMetrics(instanceId);
    const metrics = this.instanceMetrics.get(instanceId);

    
    if (metrics[metric] !== undefined) {
      metrics[metric] += value;
      logger.debug(`Tracked metric ${metric} for instance ${instanceId}, new value: ${metrics[metric]}`);
    }
  }

  // Сохранение текущих метрик в базу данных
  async saveMetrics() {
    for (const [instanceId, metrics] of this.instanceMetrics.entries()) {
      try {
        // Формируем дату без времени (только год-месяц-день)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Проверяем существование записи
        const existingUsage = await prisma.instanceUsage.findUnique({
          where: {
            instance_usage_date: {
              instanceId,
              date: today
            }
          }
        });

        if (existingUsage) {
          // Обновляем существующую запись
          await prisma.instanceUsage.update({
            where: { id: existingUsage.id },
            data: {
              messagesSent: { increment: metrics.messagesSent },
              messagesReceived: { increment: metrics.messagesReceived },
              mediaSent: { increment: metrics.mediaSent },
              mediaReceived: { increment: metrics.mediaReceived },
              totalMediaSize: { increment: metrics.mediaSize },
              apiCalls: { increment: metrics.apiCalls },
              webhookSent: { increment: metrics.webhookCalls }
            }
          });
        } else {
          // Создаем новую запись
          await prisma.instanceUsage.create({
            data: {
              instanceId,
              date: today,
              messagesSent: metrics.messagesSent,
              messagesReceived: metrics.messagesReceived,
              mediaSent: metrics.mediaSent,
              mediaReceived: metrics.mediaReceived,
              totalMediaSize: metrics.mediaSize,
              apiCalls: metrics.apiCalls,
              webhookSent: metrics.webhookCalls
            }
          });
        }

        // Очищаем метрики после сохранения
        metrics.messagesSent = 0;
        metrics.messagesReceived = 0;
        metrics.mediaSent = 0;
        metrics.mediaReceived = 0;
        metrics.mediaSize = 0;
        metrics.apiCalls = 0;
        metrics.webhookCalls = 0;
      } catch (error) {
        logger.error(`Error saving usage metrics for instance ${instanceId}`, {
          error: error.message,
          stack: error.stack
        });
      }
    }
  }

  // Проверка превышения лимитов
  async checkUsageLimits() {
    try {
      // Получаем всех активных пользователей с инстансами
      const users = await prisma.user.findMany({
        where: {
          instances: {
            some: {
              status: 'connected'
            }
          }
        },
        include: {
          instances: {
            where: {
              status: 'connected'
            }
          }
        }
      });

      for (const user of users) {
        // Проверяем лимиты для каждого пользователя
        const userLimits = await prisma.usageLimit.findFirst({
          where: { userId: user.id }
        });

        const defaultLimits = await prisma.usageLimit.findFirst({
          where: { isDefault: true }
        });

        const limits = userLimits || defaultLimits;
        if (!limits) continue;

        for (const instance of user.instances) {
          // Проверяем специфичные лимиты для инстанса
          const instanceLimits = await prisma.usageLimit.findFirst({
            where: { instanceId: instance.id }
          });

          const effectiveLimits = instanceLimits || limits;

          // Получаем статистику использования для расчетного периода
          const periodStart = new Date();
          periodStart.setHours(periodStart.getHours() - effectiveLimits.timeWindowHours);

          const usage = await prisma.instanceUsage.findMany({
            where: {
              instanceId: instance.id,
              date: {
                gte: periodStart
              }
            }
          });

          // Суммируем метрики за период
          const totalUsage = usage.reduce((acc, curr) => ({
            messagesSent: acc.messagesSent + curr.messagesSent,
            messagesReceived: acc.messagesReceived + curr.messagesReceived,
            mediaSent: acc.mediaSent + curr.mediaSent,
            mediaReceived: acc.mediaReceived + curr.mediaReceived,
            totalMediaSize: acc.totalMediaSize + curr.totalMediaSize,
            apiCalls: acc.apiCalls + curr.apiCalls,
            webhookSent: acc.webhookSent + curr.webhookSent
          }), {
            messagesSent: 0,
            messagesReceived: 0,
            mediaSent: 0,
            mediaReceived: 0,
            totalMediaSize: 0,
            apiCalls: 0,
            webhookSent: 0
          });

          // Проверяем каждый лимит
          const exceededLimits = [];

          if (effectiveLimits.maxMessagesSent &&
            totalUsage.messagesSent > effectiveLimits.maxMessagesSent) {
            exceededLimits.push('maxMessagesSent');
          }

          if (effectiveLimits.maxMessagesReceived &&
            totalUsage.messagesReceived > effectiveLimits.maxMessagesReceived) {
            exceededLimits.push('maxMessagesReceived');
          }

          if (effectiveLimits.maxMediaSent &&
            totalUsage.mediaSent > effectiveLimits.maxMediaSent) {
            exceededLimits.push('maxMediaSent');
          }

          if (effectiveLimits.maxMediaReceived &&
            totalUsage.mediaReceived > effectiveLimits.maxMediaReceived) {
            exceededLimits.push('maxMediaReceived');
          }

          if (effectiveLimits.maxMediaSize &&
            totalUsage.totalMediaSize > effectiveLimits.maxMediaSize) {
            exceededLimits.push('maxMediaSize');
          }

          if (effectiveLimits.maxApiCalls &&
            totalUsage.apiCalls > effectiveLimits.maxApiCalls) {
            exceededLimits.push('maxApiCalls');
          }

          if (effectiveLimits.maxWebhookCalls &&
            totalUsage.webhookSent > effectiveLimits.maxWebhookCalls) {
            exceededLimits.push('maxWebhookCalls');
          }

          if (exceededLimits.length > 0) {
            logger.warn(`Instance ${instance.id} exceeded usage limits`, {
              exceededLimits,
              usage: totalUsage
            });

            // Отключаем инстанс при превышении лимитов
            try {
              await whatsappManager.stopInstance(instance.id);

              // Обновляем статус в базе данных
              await prisma.instance.update({
                where: { id: instance.id },
                data: {
                  status: 'limit_exceeded',
                  qrCode: null
                }
              });

              // Регистрируем активность
              await prisma.activityLog.create({
                data: {
                  instanceId: instance.id,
                  action: 'limit_exceeded',
                  details: {
                    exceededLimits,
                    usage: totalUsage,
                    limits: {
                      maxMessagesSent: effectiveLimits.maxMessagesSent,
                      maxMessagesReceived: effectiveLimits.maxMessagesReceived,
                      maxMediaSent: effectiveLimits.maxMediaSent,
                      maxMediaReceived: effectiveLimits.maxMediaReceived,
                      maxMediaSize: effectiveLimits.maxMediaSize,
                      maxApiCalls: effectiveLimits.maxApiCalls,
                      maxWebhookCalls: effectiveLimits.maxWebhookCalls
                    },
                    timeWindowHours: effectiveLimits.timeWindowHours
                  }
                }
              });

              // Отправляем уведомление через вебхук
              await whatsappManager.sendWebhook(instance.id, {
                event: 'limit_exceeded',
                data: {
                  instanceId: instance.id,
                  exceededLimits,
                  usage: totalUsage
                }
              });
            } catch (error) {
              logger.error(`Error stopping instance ${instance.id} after limit exceeded`, {
                error: error.message,
                stack: error.stack
              });
            }
          }
        }
      }
    } catch (error) {
      logger.error('Error checking usage limits', {
        error: error.message,
        stack: error.stack
      });
    }
  }

  // Получение системных метрик для всех инстансов
  async collectSystemMetrics() {
    try {
      // Исправляем циклическую зависимость, импортируя модуль здесь
      const whatsappManager = require('./whatsapp-manager.service');

      // Получаем все активные инстансы
      const instances = await prisma.instance.findMany({
        where: { status: 'connected' }
      });

      for (const instance of instances) {
        // Проверяем, что whatsappManager и его instances определены
        if (!whatsappManager || !whatsappManager.instances) {
          logger.warn(`WhatsApp manager or instances map is not available for metrics collection`);
          continue;
        }

        const instanceObj = whatsappManager.instances.get(instance.id);
        if (!instanceObj) continue;

        // Используем process.memoryUsage() для оценки использования памяти
        const memoryUsage = process.memoryUsage();
        const heapTotal = Math.round(memoryUsage.heapTotal / 1024 / 1024); // MB

        // Приблизительная оценка использования CPU
        const cpuStart = process.cpuUsage();
        await new Promise(resolve => setTimeout(resolve, 100));
        const cpuEnd = process.cpuUsage(cpuStart);
        const cpuUsage = (cpuEnd.user + cpuEnd.system) / 1000000; // в секундах

        // Сохраняем системные метрики
        await prisma.instanceUsage.updateMany({
          where: {
            instanceId: instance.id,
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
          },
          data: {
            memoryUsage: heapTotal,
            cpuUsage
          }
        });
      }
    } catch (error) {
      logger.error('Error collecting system metrics', {
        error: error.message,
        stack: error.stack
      });
    }
  }
}

module.exports = new UsageMonitorService();