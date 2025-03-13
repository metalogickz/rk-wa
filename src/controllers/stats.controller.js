const logger = require('../utils/logger');
const dbConnector = require('../utils/db-connector');

class StatsController {
  async getInstanceStats(req, res, next) {
    try {
      const prisma = dbConnector.getClient();
      const instanceId = req.params.instanceId;
      const period = req.query.period || 'today'; // today, week, month, all
      const startDate = new Date();
      
      // Определяем период выборки
      switch (period) {
        case 'week':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case 'all':
          startDate.setFullYear(2000); // Практически "все время"
          break;
        default: // today
          startDate.setHours(0, 0, 0, 0);
      }
      
      // Получаем статистику использования
      const usageStats = await prisma.instanceUsage.findMany({
        where: {
          instanceId,
          date: {
            gte: startDate
          }
        },
        orderBy: {
          date: 'asc'
        }
      });
      
      // Если запрашивается дневная статистика, возвращаем детальные данные
      if (period === 'today') {
        return res.json({ usage: usageStats });
      }
      
      // Для более длинных периодов - агрегируем данные
      const aggregated = {
        messagesSent: 0,
        messagesReceived: 0,
        mediaSent: 0,
        mediaReceived: 0,
        totalMediaSize: 0,
        apiCalls: 0,
        webhookSent: 0,
        dailyStats: []
      };
      
      usageStats.forEach(stat => {
        aggregated.messagesSent += stat.messagesSent;
        aggregated.messagesReceived += stat.messagesReceived;
        aggregated.mediaSent += stat.mediaSent;
        aggregated.mediaReceived += stat.mediaReceived;
        aggregated.totalMediaSize += stat.totalMediaSize;
        aggregated.apiCalls += stat.apiCalls;
        aggregated.webhookSent += stat.webhookSent;
        
        // Добавляем запись в дневную статистику
        aggregated.dailyStats.push({
          date: stat.date,
          messagesSent: stat.messagesSent,
          messagesReceived: stat.messagesReceived,
          mediaSent: stat.mediaSent,
          mediaReceived: stat.mediaReceived
        });
      });
      
      res.json({ usage: aggregated });
    } catch (error) {
      next(error);
    }
  }
  
  async getUserStats(req, res, next) {
    try {
      const prisma = dbConnector.getClient();
      const userId = req.user.id;
      const period = req.query.period || 'month';
      const startDate = new Date();
      
      // Определяем период выборки
      switch (period) {
        case 'week':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case 'year':
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        case 'all':
          startDate.setFullYear(2000);
          break;
        default: // month
          startDate.setMonth(startDate.getMonth() - 1);
      }
      
      // Получаем инстансы пользователя
      const instances = await prisma.instance.findMany({
        where: { userId },
        select: { id: true, name: true }
      });
      
      const instanceIds = instances.map(instance => instance.id);
      
      // Получаем статистику по всем инстансам пользователя
      const usageStats = await prisma.instanceUsage.findMany({
        where: {
          instanceId: { in: instanceIds },
          date: {
            gte: startDate
          }
        }
      });
      
      // Агрегируем данные по инстансам
      const instanceStats = {};
      instanceIds.forEach(id => {
        instanceStats[id] = {
          instanceId: id,
          name: instances.find(i => i.id === id).name,
          messagesSent: 0,
          messagesReceived: 0,
          mediaSent: 0,
          mediaReceived: 0,
          totalMediaSize: 0,
          apiCalls: 0,
          webhookSent: 0
        };
      });
      
      // Суммируем статистику
      usageStats.forEach(stat => {
        const instance = instanceStats[stat.instanceId];
        if (instance) {
          instance.messagesSent += stat.messagesSent;
          instance.messagesReceived += stat.messagesReceived;
          instance.mediaSent += stat.mediaSent;
          instance.mediaReceived += stat.mediaReceived;
          instance.totalMediaSize += stat.totalMediaSize;
          instance.apiCalls += stat.apiCalls;
          instance.webhookSent += stat.webhookSent;
        }
      });
      
      // Считаем общие данные
      const totalStats = {
        messagesSent: 0,
        messagesReceived: 0,
        mediaSent: 0,
        mediaReceived: 0,
        totalMediaSize: 0,
        apiCalls: 0,
        webhookSent: 0,
        instanceCount: instanceIds.length
      };
      
      Object.values(instanceStats).forEach(instance => {
        totalStats.messagesSent += instance.messagesSent;
        totalStats.messagesReceived += instance.messagesReceived;
        totalStats.mediaSent += instance.mediaSent;
        totalStats.mediaReceived += instance.mediaReceived;
        totalStats.totalMediaSize += instance.totalMediaSize;
        totalStats.apiCalls += instance.apiCalls;
        totalStats.webhookSent += instance.webhookSent;
      });
      
      res.json({
        total: totalStats,
        instances: Object.values(instanceStats)
      });
    } catch (error) {
      next(error);
    }
  }
  
  async getSystemStats(req, res, next) {
    try {
      const prisma = dbConnector.getClient();
      
      // Проверка прав администратора
      if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      // Получаем статистику по всем инстансам
      const totalInstances = await prisma.instance.count();
      const activeInstances = await prisma.instance.count({
        where: { status: 'connected' }
      });
      
      // Получаем статистику использования за последние 30 дней
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      // Обработка для SQLite и MongoDB
      let usageStats;
      
      if (dbConnector.activeProvider === 'sqlite') {
        // SQLite не поддерживает агрегацию _sum, сделаем это вручную
        const statsData = await prisma.instanceUsage.findMany({
          where: {
            date: {
              gte: thirtyDaysAgo
            }
          },
          select: {
            messagesSent: true,
            messagesReceived: true,
            mediaSent: true,
            mediaReceived: true,
            totalMediaSize: true,
            apiCalls: true,
            webhookSent: true
          }
        });
        
        usageStats = {
          _sum: {
            messagesSent: statsData.reduce((sum, item) => sum + item.messagesSent, 0),
            messagesReceived: statsData.reduce((sum, item) => sum + item.messagesReceived, 0),
            mediaSent: statsData.reduce((sum, item) => sum + item.mediaSent, 0),
            mediaReceived: statsData.reduce((sum, item) => sum + item.mediaReceived, 0),
            totalMediaSize: statsData.reduce((sum, item) => sum + item.totalMediaSize, 0),
            apiCalls: statsData.reduce((sum, item) => sum + item.apiCalls, 0),
            webhookSent: statsData.reduce((sum, item) => sum + item.webhookSent, 0)
          }
        };
      } else {
        // MongoDB поддерживает агрегацию
        usageStats = await prisma.instanceUsage.aggregate({
          where: {
            date: {
              gte: thirtyDaysAgo
            }
          },
          _sum: {
            messagesSent: true,
            messagesReceived: true,
            mediaSent: true,
            mediaReceived: true,
            totalMediaSize: true,
            apiCalls: true,
            webhookSent: true
          }
        });
      }
      
      // Получаем статистику по пользователям
      const totalUsers = await prisma.user.count();
      const activeUsers = await prisma.user.count({
        where: {
          instances: {
            some: {
              status: 'connected'
            }
          }
        }
      });
      
      res.json({
        instances: {
          total: totalInstances,
          active: activeInstances
        },
        users: {
          total: totalUsers,
          active: activeUsers
        },
        usage: {
          messagesSent: usageStats._sum.messagesSent || 0,
          messagesReceived: usageStats._sum.messagesReceived || 0,
          mediaSent: usageStats._sum.mediaSent || 0,
          mediaReceived: usageStats._sum.mediaReceived || 0,
          totalMediaSize: usageStats._sum.totalMediaSize || 0,
          apiCalls: usageStats._sum.apiCalls || 0,
          webhookSent: usageStats._sum.webhookSent || 0
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StatsController();