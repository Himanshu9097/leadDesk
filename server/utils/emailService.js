import nodemailer from 'nodemailer';

// Use Ethereal for testing or real SMTP for production
const sendEmail = async (options) => {
  try {
    // Create a test account if you don't have real SMTP credentials
    // let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || 'leaddesk@ethereal.email', // replace with real user
        pass: process.env.SMTP_PASS || 'pass', // replace with real pass
      },
    });

    const mailOptions = {
      from: '"LeadDesk Mini" <noreply@leaddesk.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.htmlMessage || `<p>${options.message}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Email could not be sent', error);
  }
};

export default sendEmail;
