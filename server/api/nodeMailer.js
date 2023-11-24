// emailService.js
const nodemailer = require("nodemailer");

const EMAIL_GMAIL = process.env.GOOGLE_MAIL;
const PASS_GMAIL = process.env.GOOGLE_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_GMAIL,
    pass: PASS_GMAIL,
  },
});

function sendEmailToUser(userEmail, subject, message) {
  const mailOptions = {
    from: EMAIL_GMAIL,
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

function sendEmailToPsychologist(psychologistEmail, subject, message) {
  const mailOptions = {
    from: EMAIL_GMAIL,
    to: psychologistEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

function sendEmailRegistration(userEmail, subject, message) {
  const mailOptions = {
    from: EMAIL_GMAIL,
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

function sendEmailReservation(userEmail, subject, message) {
  const mailOptions = {
    from: EMAIL_GMAIL,
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = {
  sendEmailToUser,
  sendEmailToPsychologist,
  sendEmailRegistration,
  sendEmailReservation,
};
