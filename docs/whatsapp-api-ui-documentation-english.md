# WhatsApp API UI Documentation

This document provides comprehensive information about the WhatsApp API Multi-Instance Service's web user interface. The UI allows users to manage multiple WhatsApp instances through an intuitive web interface, providing capabilities for messaging, contact management, and system monitoring.

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Dashboard](#dashboard)
4. [Instance Management](#instance-management)
   - [Creating Instances](#creating-instances)
   - [Editing Instances](#editing-instances)
   - [Instance Details](#instance-details)
   - [Connecting Instances](#connecting-instances)
5. [Messaging](#messaging)
   - [Mini Chat Interface](#mini-chat-interface)
   - [Sending Messages](#sending-messages)
   - [Sending Media](#sending-media)
6. [Contact Management](#contact-management)
   - [Viewing Contacts](#viewing-contacts)
   - [Adding Contacts](#adding-contacts)
   - [Importing Contacts](#importing-contacts)
7. [Statistics](#statistics)
8. [User Profile](#user-profile)
9. [Technical Reference](#technical-reference)
   - [API Endpoints](#api-endpoints)
   - [WebHooks](#webhooks)

## Introduction

The WhatsApp API Manager is a web-based UI that allows you to manage multiple WhatsApp instances from a single interface. The system supports creating and managing multiple WhatsApp connections, sending and receiving messages, managing contacts, and monitoring usage statistics.

Key features:
- Multi-instance management
- Real-time messaging
- Contact management
- Media sharing
- WebHook integration for notifications
- Usage statistics

## Authentication

The system supports two authentication methods:

1. **Email and Password**: Traditional login using your registered email and password
2. **API Key**: Authentication using your personal API key

### Login Process

1. Navigate to the `/login` page
2. Enter your credentials (email/password or API key)
3. Upon successful authentication, you'll be redirected to the instances page

## Dashboard

The main dashboard provides an overview of your WhatsApp instances. You can access it by navigating to `/ui/instances` after login.

The dashboard displays:
- A list of all your instances
- Current connection status of each instance
- Quick actions (view details, edit, chat, contacts, delete)
- Option to create new instances

## Instance Management

### Creating Instances

To create a new WhatsApp instance:

1. Click the "Create new instance" button on the dashboard
2. Fill in the required details:
   - **Name**: A unique identifier for your instance
   - **Description**: Optional description
   - **WebHook Settings**: Configure notification preferences
     - URL for webhooks
     - Types of notifications (received/sent messages, delivery status, read status)
     - Retry settings and secret key for secure webhook communication
3. Click "Create instance" to save

### Editing Instances

To edit an existing instance:

1. Click the "Edit" button next to the instance on the dashboard
2. Modify any of the instance settings
3. Click "Save changes" to update

### Instance Details

The instance details page provides comprehensive information about a specific instance:

- Connection status
- Instance information (name, description, webhook URL)
- QR code for WhatsApp connection (when applicable)
- Action buttons (reconnect, logout)
- Links to chat and contacts interfaces
- Recent activity log

### Connecting Instances

To connect an instance to WhatsApp:

1. Navigate to the instance details page
2. If not connected, you'll see a QR code
3. Scan the QR code with your mobile WhatsApp application:
   - Open WhatsApp on your phone
   - Go to Settings > WhatsApp Web/Desktop
   - Scan the QR code displayed on the screen
4. Once connected, the status will change to "Connected"

If the QR code is not visible or has expired:
1. Click the "Reconnect" button
2. Wait for a new QR code to appear
3. Scan the new code with your mobile WhatsApp

## Messaging

### Mini Chat Interface

The chat interface allows you to send and receive messages in real-time:

1. Navigate to the chat page by clicking "Chat" on an instance
2. Select a contact from the left panel to start a conversation
3. The chat window displays the message history with the selected contact
4. New messages appear automatically through periodic polling

### Sending Messages

To send a text message:

1. Select a contact from the contacts panel
2. Type your message in the input field at the bottom
3. Press Enter or click "Send"

### Sending Media

To send media files:

1. Select a contact from the contacts panel
2. Click the "Attach file" button
3. Select a file from your device
4. Add an optional caption
5. Click "Send media file"

Supported media types:
- Images
- Videos
- Documents
- Audio files

## Contact Management

### Viewing Contacts

The contacts page displays all contacts associated with an instance:

1. Navigate to the contacts page by clicking "Contacts" on an instance
2. View a table of all contacts with their details
3. Search for specific contacts using the search box

You can toggle between two contact sources:
- **WhatsApp**: Contacts from WhatsApp's servers
- **Database**: Contacts stored in the local database

### Adding Contacts

To add a new contact:

1. Navigate to the contacts page
2. Scroll to the "Add new contact" section
3. Enter the phone number (required)
4. Enter a name (optional)
5. Click "Add contact"

### Importing Contacts

To import contacts from WhatsApp to the local database:

1. Navigate to the contacts page
2. Click the "Import contacts" button
3. Wait for the import process to complete
4. A success message will appear with the number of imported contacts

## Statistics

The statistics page provides usage metrics for your WhatsApp instances:

1. Navigate to the statistics page by clicking "Statistics" in the navigation bar
2. Select a time period (week, month, year, or all time)
3. View aggregated statistics:
   - Total messages sent/received
   - Media files sent/received
   - API calls
   - Webhook calls
4. View individual instance statistics in the table below

## User Profile

The profile page displays your account information:

1. Navigate to the profile page
2. View your email address
3. View and copy your API key for programmatic access
4. View your name and other account details

## Technical Reference

### API Endpoints

The UI interacts with the following key API endpoints:

- `/api/auth/login`: Authentication
- `/api/auth/me`: Current user information
- `/api/instances`: Instance management
- `/api/instances/:id`: Individual instance operations
- `/api/instances/:id/qr`: QR code generation
- `/api/instances/:id/send`: Send messages
- `/api/instances/:id/contacts`: Contact management
- `/api/stats/user`: Usage statistics

### WebHooks

WebHooks allow external systems to receive notifications about events:

**Configurable events:**
- Message received
- Message sent
- Delivery status changes
- Read status changes

**WebHook payload format:**
```json
{
  "event": "message_received",
  "data": {
    "instanceId": "instance-id",
    "messageId": "message-id",
    "from": "sender-id",
    "body": "message-content",
    "timestamp": "iso-date-time"
  },
  "timestamp": "iso-date-time"
}
```

**Security features:**
- Secret key for payload signature verification
- Configurable retry mechanism for failed deliveries
- Custom HTTP headers support
