require('dotenv').config({ path: '../.env' });
const nodemailer = require('nodemailer');

const registrationTemplate = (name) =>
  `<div style='text-align: center'>
  <h1>Hello ${name}!</h1>
  <p>Thank you for creating your EduLearn account.</p>
  <p>We hope you will enjoy the space that we created for our students.</p>
  <br>
  <p style='color:grey'>The InterLearn team</p>
  </div>`;

const subcriptionTemplate = (name) =>
  `<div style='text-align: center'>
  <h1>Hello ${name}!</h1>
  <p style="color:#292929;">You have successfully subscribed to your teachers lessons</p>
  </div>`;

const registrationMailOptions = (emailTo, name) => ({
  from: process.env.EMAIL_TEST,
  to: emailTo,
  subject: 'Registration on Teachers Platform',
  html: registrationTemplate(name),
});

const subcriptionMailOptions = (emailTo, name) => ({
  from: process.env.EMAIL_TEST,
  to: emailTo,
  subject: 'Subcription to lessons',
  html: subcriptionTemplate(name),
});

const sendMail = async (emailTo, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.@gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_TEST,
      pass: process.env.EMAIL_TEST_PSWD,
    },
  });

  const mailOptions = registrationMailOptions(name);

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    return;
  });
};

module.exports = sendMail;
