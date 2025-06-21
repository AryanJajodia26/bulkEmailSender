# Bulk Email Sender

A bulk email sender application with proper Gmail authentication verification.

## Project Structure

```
Emailsender/
├── backend/          # Node.js + Express server
│   ├── server.js     # Main server file with /verify endpoint
│   ├── package.json  # Backend dependencies
│   └── package-lock.json
├── frontend/         # HTML + JavaScript frontend
│   ├── index.html    # Main HTML file
│   └── script.js     # Frontend JavaScript with email sending logic
└── README.md         # This file
```

## Features

✅ **What's Already Done:**
- UI split into left (input form) and right (status & recipient list)
- Inputs: Gmail, 16-char app password, subject, message body, time gap, recipients (comma-separated)
- **Proper Gmail authentication verification** using Node.js backend
- Displays live status updates (✅/❌) and shows clock on top right
- Sends emails one-by-one after given time gap

✅ **Authentication Fix:**
- Backend `/verify` endpoint uses `nodemailer` to properly check Gmail credentials
- Frontend calls verification API before sending any emails
- Shows clear authentication success/failure messages

## Setup & Running

1. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

3. **Open your browser:**
   Navigate to `http://localhost:3000` to access the application

## How It Works

1. **Authentication Verification:** When you submit the form, the frontend first calls the `/verify` API with your Gmail credentials
2. **Backend Verification:** The server uses `nodemailer` to verify the Gmail connection
3. **Email Sending:** Only if authentication succeeds, the frontend proceeds to send emails using SMTP.js
4. **Status Updates:** Real-time status updates show authentication results and email sending progress

## Gmail Setup

To use this application, you need to:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password (16 characters)
3. Use your Gmail address and the App Password in the application

## Dependencies

**Backend:**
- `express`: Web server framework
- `nodemailer`: Email sending library
- `cors`: Cross-origin resource sharing

**Frontend:**
- SMTP.js: Client-side email sending library 