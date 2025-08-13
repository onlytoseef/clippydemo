# 🚀 Clippy Landing Page Email Setup Guide

This guide will help you set up the email functionality for your Clippy landing page. When users click "Get Notified" and submit their email, they'll receive a beautiful congratulation email from `support@clippygen.com`.

## 📋 What We've Built

- ✅ **Node.js Backend Server** with Express and nodemailer
- ✅ **Email API Endpoint** (`/api/subscribe`)
- ✅ **Beautiful HTML Email Template** with congratulations message
- ✅ **Frontend Integration** - Updated EmailCapture component
- ✅ **Configuration Management** with environment variables
- ✅ **Error Handling** and validation
- ✅ **Easy Startup Scripts** for Windows

## 🛠️ Setup Steps

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Email Credentials

1. **Copy the environment template:**

   ```bash
   cd server
   copy env.example .env
   ```

2. **Edit the `.env` file** with your email credentials:

   ```env
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=support@clippygen.com

   # Server Configuration
   PORT=3001
   NODE_ENV=development
   ```

### Step 3: Email Provider Setup

#### For Gmail (Recommended):

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password:**
   - Go to Google Account Settings → Security
   - Under "2-Step Verification", click "App passwords"
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS` in your `.env` file

#### For Other Providers:

- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Update `EMAIL_HOST` and `EMAIL_PORT`

### Step 4: Test Email Functionality

```bash
cd server
node test-email.js
```

This will send a test email to verify your configuration works.

### Step 5: Start the Email Server

#### Option A: Using PowerShell (Recommended)

```bash
cd server
.\start.ps1
```

#### Option B: Using Command Prompt

```bash
cd server
start.bat
```

#### Option C: Manual Start

```bash
cd server
npm run dev
```

### Step 6: Test the Complete Flow

1. **Start your React frontend** (in a new terminal):

   ```bash
   npm run dev
   ```

2. **Start the email server** (in another terminal):

   ```bash
   cd server
   npm run dev
   ```

3. **Test the landing page:**
   - Go to your landing page
   - Click "Get Notified"
   - Enter an email address
   - Submit and check the inbox for the congratulation email!

## 🔧 Configuration Options

### Environment Variables

| Variable     | Description                      | Default                 |
| ------------ | -------------------------------- | ----------------------- |
| `EMAIL_HOST` | SMTP server hostname             | `smtp.gmail.com`        |
| `EMAIL_PORT` | SMTP server port                 | `587`                   |
| `EMAIL_USER` | Your email username              | Required                |
| `EMAIL_PASS` | Your email password/app password | Required                |
| `EMAIL_FROM` | Sender email address             | `support@clippygen.com` |
| `PORT`       | Server port                      | `3001`                  |
| `NODE_ENV`   | Environment mode                 | `development`           |

### Customizing Email Content

Edit the email template in `server/server.js` around line 60. The template includes:

- Welcome message
- Waiting list confirmation
- Special rewards announcement
- Professional styling

## 📧 Email Template Features

The congratulation email includes:

- 🎉 **Welcome Header** with Clippy branding
- 📝 **Waiting List Confirmation**
- 🎁 **Special Rewards Announcement** (exclusive discounts)
- 🔗 **Call-to-Action Button**
- 📱 **Responsive Design** for all devices
- ✨ **Professional Styling** with brand colors

## 🚨 Troubleshooting

### Common Issues:

1. **"Authentication failed"**

   - Check your email/password
   - Ensure 2FA is enabled (for Gmail)
   - Use App Password instead of regular password

2. **"Connection failed"**

   - Check internet connection
   - Verify SMTP host/port
   - Check firewall settings

3. **"CORS error" in frontend**

   - Ensure email server is running on port 3001
   - Check that frontend is calling correct URL

4. **"Email not sending"**
   - Run `node test-email.js` to test configuration
   - Check server console for error messages

### Debug Mode:

Enable detailed logging by setting `NODE_ENV=development` in your `.env` file.

## 🌐 API Endpoints

- **POST** `/api/subscribe` - Submit email and send congratulation email
- **GET** `/api/health` - Health check endpoint

## 🔒 Security Notes

- ✅ Never commit `.env` file to version control
- ✅ Use environment variables for sensitive data
- ✅ Consider rate limiting for production
- ✅ Validate emails on both frontend and backend

## 🚀 Production Deployment

For production:

1. Set `NODE_ENV=production`
2. Use production SMTP service (SendGrid, Mailgun, etc.)
3. Implement rate limiting and monitoring
4. Use HTTPS and proper domain configuration
5. Set up email delivery monitoring

## 📞 Support

If you encounter issues:

1. Check the server console for error messages
2. Run the test script: `node test-email.js`
3. Verify your `.env` configuration
4. Check email provider settings

---

**🎉 You're all set!** Your Clippy landing page now sends beautiful congratulation emails to new subscribers, welcoming them to the waiting list with promises of special rewards and exclusive discounts.
