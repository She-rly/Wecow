# WECOW LTD - Full Stack Setup Guide

## 🚀 Quick Start

This project includes a frontend (HTML/CSS/JS) and a Node.js/Express backend with PostgreSQL database and Gmail email notifications.

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Gmail account (for email notifications)
- npm or yarn

---

## 🛠️ Setup Instructions

### 1. **PostgreSQL Database Setup**

#### Windows:
```bash
# Install PostgreSQL from: https://www.postgresql.org/download/windows/
# During installation, remember your password for the 'postgres' user

# Open PostgreSQL command line (pgAdmin or psql)
# Create the database:
CREATE DATABASE wecow_db;
```

#### macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Create database
createdb wecow_db
```

#### Linux (Ubuntu):
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database
sudo -u postgres createdb wecow_db
```

### 2. **Backend Setup**

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Update .env file with your PostgreSQL credentials
# Open server/.env and update:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wecow_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Test the server
npm run dev
# Should see: "Server is running on http://localhost:5000"
```

### 3. **Gmail Setup for Email Notifications**

1. **Enable 2-Factor Authentication on your Gmail account**
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the generated 16-character password

3. **Update .env file**
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   EMAIL_FROM=noreply@wecow.com
   ADMIN_EMAIL=your_email@gmail.com  (where you want to receive contact submissions)
   ```

### 4. **Run the Backend**

```bash
cd server

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Expected output:
```
Database tables initialized successfully
Email service is ready to send
Server is running on http://localhost:5000
```

### 5. **Open Frontend**

- Open `index.html` in your browser or use a local server:
  ```bash
  # Using Python 3
  python -m http.server 8000
  
  # Then visit: http://localhost:8000
  ```

---

## 📊 API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running
  ```
  Response: { "message": "Server is running", "timestamp": "..." }
  ```

### Contact Form (Frontend Integration)
- **POST** `/api/contacts` - Submit contact form
  ```json
  Request: {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'm interested in your services"
  }
  Response: {
    "success": true,
    "message": "Your message has been received...",
    "contactId": 1
  }
  ```

### Admin Endpoints
- **GET** `/api/contacts` - Get all contacts
- **GET** `/api/contacts/:id` - Get specific contact
- **PUT** `/api/contacts/:id` - Update contact status

---

## 🗄️ Database Schema

### Contacts Table
```sql
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📧 Email Flow

When a user submits the contact form:

1. **User receives confirmation email** - "We received your message"
2. **Admin receives notification email** - Contains the full submission details
3. **Message stored in database** - For record-keeping and follow-up

---

## 🐛 Troubleshooting

### "Database connection error"
- Check PostgreSQL is running
- Verify credentials in `.env` file
- Ensure database `wecow_db` exists

### "Email not sending"
- Verify Gmail App Password is correct
- Ensure 2-Factor Authentication is enabled on Gmail
- Check `EMAIL_USER` is correct in `.env`
- Allow "Less secure apps" if not using App Password

### "CORS errors in browser"
- Backend is running on `http://localhost:5000`
- Frontend should access from `http://localhost:8000` or similar
- CORS is already enabled in `server.js`

### "Port 5000 already in use"
- Change PORT in `.env` to another number (e.g., 5001)
- Or kill the process using port 5000

---

## 📁 Project Structure

```
Sample/
├── index.html              (Frontend)
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/                 (Images, logos)
├── README.md
└── server/
    ├── server.js           (Main server file)
    ├── package.json
    ├── .env               (Configuration - update this!)
    ├── config/
    │   ├── database.js    (PostgreSQL connection)
    │   └── mail.js        (Email configuration)
    ├── models/
    │   └── Contact.js     (Data model)
    ├── controllers/
    │   └── contactController.js
    └── routes/
        └── contacts.js    (API routes)
```

---

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

For production deployment (Heroku, AWS, etc.), you'll need to:
1. Update `.env` with production database URL
2. Set up environment variables on hosting platform
3. Run database migrations on production server

---

## 📞 Support

For issues or questions:
- Email: wecow001@gmail.com
- Check backend logs for error details
- Verify all credentials in `.env` file

---

**Last Updated:** August 2026
