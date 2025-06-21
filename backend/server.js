const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Verification endpoint
app.post('/verify', async (req, res) => {
    const { email, appPassword } = req.body;

    console.log('Verification request received for:', email);

    if (!email || !appPassword) {
        console.log('Missing email or app password');
        return res.json({
            success: false,
            message: 'Email and app password are required'
        });
    }

    if (appPassword.length !== 16) {
        console.log('App password length incorrect:', appPassword.length);
        return res.json({
            success: false,
            message: 'App password must be exactly 16 characters'
        });
    }

    try {
        console.log('Creating Gmail transporter...');
        
        // Create transporter with Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: appPassword
            },
            // Add additional options for better compatibility
            secure: true,
            port: 465,
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log('Attempting to verify connection...');
        
        // Verify connection configuration
        await transporter.verify();
        
        console.log('Authentication successful for:', email);
        
        res.json({
            success: true,
            message: 'Authentication successful'
        });
    } catch (error) {
        console.error('Authentication error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            responseCode: error.responseCode,
            response: error.response
        });
        
        let errorMessage = 'Authentication failed. Please check your email and app password.';
        
        // Provide more specific error messages
        if (error.code === 'EAUTH') {
            errorMessage = 'Invalid email or app password. Please verify your credentials.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Connection failed. Please check your internet connection.';
        } else if (error.responseCode === 535) {
            errorMessage = 'Authentication failed. Please check your app password.';
        } else if (error.responseCode === 534) {
            errorMessage = 'Authentication failed. Please enable 2-factor authentication and use an app password.';
        }
        
        res.json({
            success: false,
            message: errorMessage,
            details: error.message
        });
    }
});

// Serve static files from frontend directory (should be after API routes)
app.use(express.static(path.join(__dirname, '../frontend')));

// Send email endpoint
app.post('/send-email', async (req, res) => {
    const { email, appPassword, to, subject, body } = req.body;

    if (!email || !appPassword || !to || !subject || !body) {
        return res.json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        // Create transporter with Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email,
                pass: appPassword
            },
            secure: true,
            port: 465,
            tls: {
                rejectUnauthorized: false
            }
        });

        // Send email
        const mailOptions = {
            from: email,
            to: to,
            subject: subject,
            text: body
        };

        const result = await transporter.sendMail(mailOptions);
        
        res.json({
            success: true,
            message: 'Email sent successfully',
            messageId: result.messageId
        });
    } catch (error) {
        console.error('Email sending error:', error);
        res.json({
            success: false,
            message: 'Failed to send email',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 