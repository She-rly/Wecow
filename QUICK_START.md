# ⚡ WECOW LTD - Quick Start for Windows

## ✅ What's Done So Far
- ✓ Backend code created
- ✓ Node.js packages installed

## 📋 Next Steps (Follow These)

### **STEP 1: Install PostgreSQL** (if not already done)
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. **REMEMBER the password** you set for the `postgres` user (you'll need this)
4. Install with default settings

---

### **STEP 2: Create the Database**

**Option A: Using pgAdmin (Easiest)**
1. Search for "pgAdmin" in Windows Start Menu and open it
2. Right-click on **"Databases"** in left panel
3. Click **"Create"** → **"Database"**
4. Type name: `wecow_db`
5. Click **"Save"**
6. Done! ✓

**Option B: Using Command Line**
```bash
psql -U postgres
# It will ask for password (the one you set during install)

CREATE DATABASE wecow_db;
\q
# Type \q to exit
```

---

### **STEP 3: Configure Backend** 

Edit `server/.env` and update these values:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wecow_db
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD  ← Change this!

EMAIL_USER=your_email@gmail.com  ← Change this!
EMAIL_PASSWORD=your_app_password  ← Change this!
EMAIL_FROM=noreply@wecow.com
ADMIN_EMAIL=your_email@gmail.com  ← Change this!
```

**How to get Gmail App Password:**
1. Go to: https://myaccount.google.com/security
2. Turn on "2-Step Verification" (if not done)
3. Go to: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste in `.env` as `EMAIL_PASSWORD`

---

### **STEP 4: Start the Backend Server**

Open PowerShell/Command Prompt in the `server` folder:

```bash
npm run dev
```

You should see:
```
Database tables initialized successfully
Email service is ready to send
Server is running on http://localhost:5000
```

✓ **Keep this terminal open!** The server needs to keep running.

---

### **STEP 5: Test the Frontend**

1. Open a new terminal (keep the first one running)
2. Go to the root folder: `cd c:\Users\Celine\Desktop\Sample`
3. Start a local server:
   ```bash
   python -m http.server 8000
   ```
   Or if using Node:
   ```bash
   npx http-server
   ```

4. Open browser: `http://localhost:8000`
5. Scroll to "Get In Touch" section
6. Fill out the form and click "Send Message"
7. You should get:
   - ✓ Success message in browser
   - ✓ Confirmation email to your email
   - ✓ Notification email to your ADMIN_EMAIL

---

## 🆘 Troubleshooting

### "ERROR: connect ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL is not running
- Start PostgreSQL service (search "Services" in Windows)
- Or restart PostgreSQL from Task Manager

### "password authentication failed"
- DB_PASSWORD in `.env` is wrong
- Make sure it's the password you set during PostgreSQL install

### "Email not sending"
- Check EMAIL_USER and EMAIL_PASSWORD are correct
- Verify Gmail 2-Step Verification is enabled
- Verify App Password is exactly 16 characters

### "Cannot reach http://localhost:8000"
- Make sure Python/Node server is running
- Try different port: `python -m http.server 8001`

---

## 📊 Database Verification

After starting the backend, run this to verify the database:

```bash
psql -U postgres -d wecow_db -c "SELECT * FROM contacts;"
```

Should show the table with a test contact.

---

## 🚀 You're All Set!

Your full-stack app is ready:
- **Frontend:** `http://localhost:8000`
- **Backend API:** `http://localhost:5000`
- **Database:** PostgreSQL running locally
- **Emails:** Gmail notifications enabled

**Try submitting a contact form and watch the magic happen!** 🎉

---

Need help? Check `BACKEND_SETUP.md` for more detailed information.
