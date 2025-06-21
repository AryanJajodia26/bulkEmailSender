# 📧 Bulk Mail Sender

A modern, professional bulk email sender application with Gmail authentication verification and time-gapped delivery.

![Bulk Email Sender](https://img.shields.io/badge/Status-Ready%20for%20Deployment-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.18.2-blue)
![Nodemailer](https://img.shields.io/badge/Nodemailer-6.9.8-orange)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Beautiful gradient background** with glass morphism effects
- **Professional header** with gradient text
- **Responsive design** that works on all devices
- **Smooth animations** and hover effects
- **Custom scrollbars** with gradient styling
- **Color-coded status messages** (green for success, red for errors)

### 🔐 **Secure Authentication**
- **Gmail App Password verification** using backend nodemailer
- **Real-time authentication status** with detailed error messages
- **Secure credential handling** through backend API
- **No client-side password exposure**

### 📧 **Email Functionality**
- **Bulk email sending** with configurable time gaps
- **Real-time status updates** for each email
- **Backend email processing** for reliability
- **Gmail SMTP integration** with proper authentication
- **Error handling** with detailed feedback

### 🎯 **User Experience**
- **Live clock display** in the interface
- **Help button** linking to app password documentation
- **Form validation** with clear error messages
- **Progress tracking** for email sending
- **Professional branding** with author information

## 🏗️ Project Structure

```
Emailsender/
├── backend/              # Node.js + Express server
│   ├── server.js         # Main server with /verify & /send-email endpoints
│   ├── package.json      # Backend dependencies
│   ├── package-lock.json # Dependency lock file
│   └── Procfile          # Heroku deployment config
├── frontend/             # HTML + JavaScript frontend
│   ├── index.html        # Modern UI with glass morphism design
│   └── script.js         # Frontend logic with backend API calls
├── README.md             # This file
└── DEPLOYMENT.md         # Comprehensive deployment guide
```

## 🚀 Quick Start

### **Local Development**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bulk-email-sender.git
   cd bulk-email-sender
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### **Deployment (Recommended: Render)**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy on Render:**
   - Go to [Render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Set **Root Directory:** `backend`
   - Set **Build Command:** `npm install`
   - Set **Start Command:** `npm start`
   - Deploy!

3. **Your app will be live at:** `https://your-app-name.onrender.com`

## 📋 Prerequisites

### **Gmail Setup**
1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password:**
   - Go to Google Account Settings → Security
   - Under "2-Step Verification" → "App passwords"
   - Generate a 16-character app password
3. **Use the app password** (not your regular Gmail password)

## 🎨 UI Features

### **Modern Design Elements**
- **Gradient Background:** Purple-blue gradient (`#667eea` to `#764ba2`)
- **Glass Morphism:** Semi-transparent panels with backdrop blur
- **Typography:** Segoe UI font with proper hierarchy
- **Animations:** Smooth transitions and hover effects
- **Responsive:** Works perfectly on desktop and mobile

### **Interactive Elements**
- **Header:** "📧 Bulk Mail Sender" with gradient text
- **Author Card:** "Aryan Jajodia IIT Patna" (top left)
- **Clock:** Real-time display (top right)
- **Help Button:** "?" button for app password assistance
- **Status Box:** Color-coded email progress

## 🔧 Technical Details

### **Backend API Endpoints**
- **`POST /verify`** - Gmail authentication verification
- **`POST /send-email`** - Send individual emails
- **`GET /`** - Serve frontend static files

### **Frontend Features**
- **Form validation** with real-time feedback
- **API integration** with error handling
- **Status updates** with progress tracking
- **Time-gapped email sending** with delays

### **Security Features**
- **Backend-only email processing** (no client-side SMTP)
- **Secure credential verification** before sending
- **CORS enabled** for cross-origin requests
- **Environment variable support** for production

## 🌐 Deployment Options

### **Supported Platforms**
- ✅ **Render** (Recommended - Easy setup)
- ✅ **Heroku** (Good free tier)
- ✅ **Railway** (Fast deployment)
- ✅ **Vercel** (Excellent performance)
- ✅ **DigitalOcean** (More control)

### **Environment Variables**
```bash
PORT=3000                    # Server port (auto-set by platforms)
NODE_ENV=production          # Environment mode
```

## 📱 Usage

1. **Enter your Gmail address** and 16-character app password
2. **Fill in email details:** subject, body, time gap
3. **Add recipient emails** (comma-separated)
4. **Click "🚀 Send Emails"**
5. **Watch real-time progress** in the status box

## 🛠️ Technologies Used

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Nodemailer** - Email sending library
- **CORS** - Cross-origin resource sharing

### **Frontend**
- **HTML5** - Structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Frontend logic
- **Fetch API** - Backend communication

## 🎯 Author

**Aryan Jajodia**  
*IIT Patna*

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Issues & Support

If you encounter any issues:
1. Check the [Gmail App Password setup](https://docs.google.com/document/d/1dyNTOKX1S1xI_AM7Kv3jKXgmR5r0poPvHbglBAKajPQ/edit?addon_store&tab=t.0#heading=h.babklfic9rem)
2. Ensure your app password is exactly 16 characters
3. Verify 2-factor authentication is enabled
4. Check the browser console for error details

---

**Ready for deployment! Your professional bulk email sender awaits! 🚀** 