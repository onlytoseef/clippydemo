# Firebase Setup Guide for Email Management

This guide will help you set up Firebase to store and manage collected email addresses from your Clippy landing page.

## 🚀 Quick Start

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard to create your project

### 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can add security rules later)
4. Select a location for your database

### 3. Get Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web app icon (</>) to add a web app
5. Register your app with a nickname
6. Copy the Firebase configuration object

### 4. Update Environment Variables

Replace the placeholder values in your `.env` file with your actual Firebase configuration:

```env
VITE_EMAIL_SUBSCRIBE_API=https://emailsend-neon.vercel.app/api/subscribe

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_actual_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_actual_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_actual_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
VITE_FIREBASE_APP_ID=your_actual_app_id
```

### 5. Set Up Firestore Security Rules

In your Firestore Database, go to "Rules" tab and add these basic rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to emails collection
    match /emails/{document} {
      allow read, write: if true; // For development - make more restrictive for production
    }
  }
}
```

## 📧 How It Works

### Email Collection Flow

1. User submits email on landing page
2. Email is sent to your API endpoint
3. Email is also saved to Firebase Firestore
4. You can manage all emails through the admin panel

### Admin Panel Access

- **URL**: `/admin/emails`
- **Features**:
  - View all collected emails
  - Search and filter emails
  - Export to Excel (.xlsx) or CSV
  - Real-time statistics
  - Email status management

## 🔧 Features

### Email Management

- **Real-time Updates**: Emails are automatically saved to Firebase
- **Search & Filter**: Find emails by address, date, or status
- **Export Options**: Download as Excel or CSV with timestamps
- **Statistics**: View total count, active subscribers, and latest signups

### Export Formats

- **Excel (.xlsx)**: Formatted spreadsheet with proper column widths
- **CSV**: Comma-separated values for easy data processing
- **Auto-naming**: Files include current date for organization

## 🛡️ Security Considerations

### For Production

1. **Restrict Firestore Access**: Implement proper authentication and authorization
2. **API Key Protection**: Ensure Firebase API keys are not exposed publicly
3. **Rate Limiting**: Consider implementing rate limiting on your API
4. **Data Validation**: Add server-side validation for email addresses

### Recommended Firestore Rules for Production

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /emails/{document} {
      // Only allow authenticated users to read emails
      allow read: if request.auth != null;
      // Allow anyone to write emails (for signup)
      allow write: if true;
    }
  }
}
```

## 📱 Usage

### Viewing Emails

1. Navigate to `/admin/emails` in your app
2. All collected emails will be displayed in a table
3. Use the search bar to find specific emails
4. Click "Refresh" to load latest data

### Exporting Data

1. Use the search/filter to narrow down emails if needed
2. Click "Export Excel" for .xlsx format
3. Click "Export CSV" for CSV format
4. Files will download automatically with timestamp

### Managing Emails

- View email addresses and signup timestamps
- See subscription status (active/unsubscribed)
- Contact users directly from the admin panel

## 🚨 Troubleshooting

### Common Issues

1. **Firebase Connection Error**

   - Check your Firebase configuration in `.env`
   - Ensure Firestore Database is enabled
   - Verify your project ID is correct

2. **Export Not Working**

   - Check browser console for errors
   - Ensure you have write permissions to your downloads folder
   - Try refreshing the page and exporting again

3. **Emails Not Saving**
   - Check Firebase console for errors
   - Verify Firestore security rules allow writes
   - Check browser console for JavaScript errors

### Debug Mode

Enable console logging by checking the browser's developer tools console for detailed error messages.

## 📞 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Ensure all dependencies are installed (`npm install`)
4. Check that your Firebase project has Firestore enabled

## 🔄 Updates

The system automatically:

- Saves new emails to Firebase when submitted
- Updates the admin panel in real-time
- Maintains email history with timestamps
- Provides export functionality for data analysis

---

**Note**: This setup provides a basic email management system. For production use, consider implementing additional security measures, user authentication, and data validation.
