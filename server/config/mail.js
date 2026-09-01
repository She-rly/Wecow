const nodemailer = require('nodemailer');
require('dotenv').config();

const hasValidMailConfig = () => {
  const emailUser = process.env.EMAIL_USER || '';
  const emailPassword = process.env.EMAIL_PASSWORD || '';

  return Boolean(emailUser && emailUser !== 'your_email@gmail.com' && emailPassword && emailPassword !== 'your_app_password');
};

const transporter = hasValidMailConfig()
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  : null;

// Send email to admin about new contact submission
const sendAdminNotification = async (contactData) => {
  try {
    if (!transporter) {
      console.warn('Email not sent: Gmail credentials are not configured.');
      return { skipped: true };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Submission from ${contactData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent');
    return { skipped: false };
  } catch (error) {
    console.error('Error sending admin email:', error.message);
    return { skipped: true, error: error.message };
  }
};

// Send confirmation email to user
const sendUserConfirmation = async (userEmail, userName) => {
  try {
    if (!transporter) {
      console.warn('Confirmation email not sent: Gmail credentials are not configured.');
      return { skipped: true };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: 'We received your message - WECOW LTD',
      html: `
        <h2>Hello ${userName},</h2>
        <p>Thank you for contacting WECOW LTD!</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>WECOW LTD Team<br>Women Employment & Community Welfare</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('User confirmation email sent to', userEmail);
    return { skipped: false };
  } catch (error) {
    console.error('Error sending user confirmation email:', error.message);
    return { skipped: true, error: error.message };
  }
};

// Test email connection
const testEmailConnection = async () => {
  try {
    if (!transporter) {
      console.warn('Email service is not configured yet. Add valid Gmail credentials in server/.env to enable real email delivery.');
      return;
    }

    await transporter.verify();
    console.log('Email service is ready to send');
  } catch (error) {
    console.error('Email service error:', error.message);
  }
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  testEmailConnection,
};
