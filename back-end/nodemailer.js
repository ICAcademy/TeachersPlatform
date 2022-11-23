const nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config();

const templates = {
  registation: `
  <div style='text-align: center'>
  <h1>Hello name!</h1>
  <p>Thank you for creating your EduLearn account.</p>
  <p>We hope you will enjoy the space that we created for our students.</p>
  <br>
  <p style='color:grey'>The InterLearn team</p>
  </div>
  `,
  subcription: `
  <div style='text-align: center'>
  <h1>Hello Student!</h1>
  <p style="color:#292929;">You have successfully subscribed to your teachers lessons</p>
  </div>
  `,
};

const mail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.@gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_TEST,
      pass: process.env.EMAIL_TEST_PSWD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_TEST,
    to: process.env.EMAIL_USER,
    subject: 'Hello',
    text: 'Hello world',
    html: templates.subcription,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

mail();

module.exports = mail;
