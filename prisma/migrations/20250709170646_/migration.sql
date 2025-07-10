-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "apiKey" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "instances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disconnected',
    "qrCode" TEXT,
    "webhookUrl" TEXT,
    "webhookEnabled" BOOLEAN NOT NULL DEFAULT false,
    "sentMessages" INTEGER NOT NULL DEFAULT 0,
    "receivedMessages" INTEGER NOT NULL DEFAULT 0,
    "credentials" TEXT,
    "lastActivity" DATETIME,
    "authCreatedAt" DATETIME,
    "authExpiresAt" DATETIME,
    "authRefreshToken" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "instances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "webhook_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "notifyReceived" BOOLEAN NOT NULL DEFAULT true,
    "notifySent" BOOLEAN NOT NULL DEFAULT true,
    "notifyDelivery" BOOLEAN NOT NULL DEFAULT false,
    "notifyRead" BOOLEAN NOT NULL DEFAULT false,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "retryInterval" INTEGER NOT NULL DEFAULT 60000,
    "secret" TEXT,
    "headers" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "webhook_settings_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "instances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "remoteJid" TEXT NOT NULL,
    "fromMe" BOOLEAN NOT NULL,
    "messageType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "hasMedia" BOOLEAN NOT NULL DEFAULT false,
    "mediaUrl" TEXT,
    "caption" TEXT,
    "mimeType" TEXT,
    "fileName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'sent',
    "statusUpdatedAt" DATETIME,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "messages_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "instances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "name" TEXT,
    "number" TEXT NOT NULL,
    "remoteJid" TEXT NOT NULL,
    "pushName" TEXT,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "profilePicture" TEXT,
    "about" TEXT,
    "lastActivity" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Contact_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "instances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "activity_logs_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "instances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "webhook_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "webhookUrl" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "response" TEXT,
    "statusCode" INTEGER,
    "success" BOOLEAN NOT NULL,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "webhook_logs_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "instances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "instance_usage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "instanceId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "messagesSent" INTEGER NOT NULL DEFAULT 0,
    "messagesReceived" INTEGER NOT NULL DEFAULT 0,
    "mediaSent" INTEGER NOT NULL DEFAULT 0,
    "mediaReceived" INTEGER NOT NULL DEFAULT 0,
    "totalMediaSize" INTEGER NOT NULL DEFAULT 0,
    "apiCalls" INTEGER NOT NULL DEFAULT 0,
    "webhookSent" INTEGER NOT NULL DEFAULT 0,
    "memoryUsage" INTEGER,
    "cpuUsage" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "instance_usage_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "instances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usage_limits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "instanceId" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "maxMessagesSent" INTEGER,
    "maxMessagesReceived" INTEGER,
    "maxMediaSent" INTEGER,
    "maxMediaReceived" INTEGER,
    "maxMediaSize" INTEGER,
    "maxApiCalls" INTEGER,
    "maxWebhookCalls" INTEGER,
    "timeWindowHours" INTEGER NOT NULL DEFAULT 24,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "usage_limits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "usage_limits_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "instances" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_apiKey_key" ON "users"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "webhook_settings_instanceId_key" ON "webhook_settings"("instanceId");

-- CreateIndex
CREATE INDEX "messages_instanceId_remoteJid_idx" ON "messages"("instanceId", "remoteJid");

-- CreateIndex
CREATE INDEX "messages_instanceId_messageId_idx" ON "messages"("instanceId", "messageId");

-- CreateIndex
CREATE INDEX "Contact_instanceId_idx" ON "Contact"("instanceId");

-- CreateIndex
CREATE INDEX "Contact_number_idx" ON "Contact"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_instanceId_remoteJid_key" ON "Contact"("instanceId", "remoteJid");

-- CreateIndex
CREATE INDEX "activity_logs_instanceId_action_idx" ON "activity_logs"("instanceId", "action");

-- CreateIndex
CREATE INDEX "activity_logs_instanceId_createdAt_idx" ON "activity_logs"("instanceId", "createdAt");

-- CreateIndex
CREATE INDEX "webhook_logs_instanceId_createdAt_idx" ON "webhook_logs"("instanceId", "createdAt");

-- CreateIndex
CREATE INDEX "instance_usage_instanceId_date_idx" ON "instance_usage"("instanceId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "instance_usage_instanceId_date_key" ON "instance_usage"("instanceId", "date");
