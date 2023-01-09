require('dotenv').config({ path: '../.env' });
const { REGISTRATION } = require('../constants/emailSend');
const nodemailer = require('nodemailer');

const registrationTemplate = (name) =>
  `<div style='text-align: center'>
  <h1>Hello ${name}!</h1>
  <p>Thank you for creating your EduLearn account.</p>
  <p>We hope you will enjoy the space that we created for our students.</p>
  <br>
  <p style='color:grey'>The InterLearn team</p>
  </div>`;

const subcriptionTemplate = (name, teacherName) =>
  `<div style='text-align: center'>
  <h1>Hello ${name}!</h1>
  <p style="color:#292929;">You have successfully subscribed to your ${teacherName}'s lessons</p>
  </div>`;

const registrationMailOptions = (emailTo, name) => ({
  from: process.env.EMAIL_TEST,
  to: emailTo,
  subject: 'Registration on Teachers Platform',
  html: registrationTemplate(name),
});

const subcriptionMailOptions = (emailTo, name, teacherName) => ({
  from: process.env.EMAIL_TEST,
  to: emailTo,
  subject: 'Subcription to lessons',
  html: subcriptionTemplate(name, teacherName),
});

const sendMail = async (emailTo, name, registrationOrSubscription, teacherName) => {
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

  const options =
    registrationOrSubscription === REGISTRATION
      ? registrationMailOptions(emailTo, name)
      : subcriptionMailOptions(emailTo, name, teacherName);

  await transporter.sendMail(options, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    return;
  });
};

module.exports = sendMail;
