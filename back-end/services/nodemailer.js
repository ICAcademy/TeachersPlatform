require('dotenv').config({ path: '../.env' });
const {
  REGISTRATION,
  SUBSCRIPTION,
  FORGOT_PASSWORD,
  CHANGED_PASSWORD,
} = require('../constants/emailSend');
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

const forgotPasswordTemplate = (name, link) =>
  `<div style='text-align: center'>
<h1>Hello ${name}!</h1>
<a href="http://${link}">Link for changing password</a>
</div>`;

const changedPasswordTemplate = (name) =>
  `<div style='text-align: center'>
  <h1>Hello ${name}!</h1>
  <p style="color:#292929;">You sucessfully have changed password. </p>
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

const forgotPasswordOptions = (emailTo, name, link) => ({
  from: process.env.EMAIL_TEST,
  to: emailTo,
  subject: 'Forgot password',
  html: forgotPasswordTemplate(name, link),
});

const changedPasswordOptions = (emailTo, name) => ({
  from: process.env.EMAIL_TEST,
  to: emailTo,
  subject: 'Forgot password',
  html: changedPasswordTemplate(name),
});

const sendMail = async (emailTo, name, emailType, teacherName, link) => {
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

  let options;

  console.log('link send mail', link);

  switch (emailType) {
    case REGISTRATION:
      options = registrationMailOptions(emailTo, name);
      break;
    case SUBSCRIPTION:
      options = subcriptionMailOptions(emailTo, name, teacherName);
      break;
    case FORGOT_PASSWORD:
      options = forgotPasswordOptions(emailTo, name, link);
      break;
    case CHANGED_PASSWORD:
      options = changedPasswordOptions(emailTo, name);
      break;
  }

  await transporter.sendMail(options, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    return;
  });
};

module.exports = sendMail;
