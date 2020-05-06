const nodeMailer = require('nodemailer');

let emailConfig;

if (process.env.EMAIL_TRANSPORTER === 'local') {
  console.log('local transporter')
  emailConfig = {
      host: 'localhost',
      port: 1025,
      auth: {
          user: 'project.1',
          pass: 'secret.1'
      }
    }

} else {
  console.log('SMTP Transporter')
  emailConfig = {
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    },
    requireTLS: true
  }
}

const emailTransporter = nodeMailer.createTransport(emailConfig);

module.exports = emailTransporter;
