/*
  This task will email out emails based on the document to ask for approval
  taking a document ID as a parameter from the message it will look up the document and then do the work
*/
const Request = require('../../db/models/request');
const nodemailer = require('nodemailer');

const sendApprovalEmails = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  const requestEntry = await Request.findById(id);
  console.log(requestEntry.approverList)

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    },
    requireTLS: true
  });

  let info;

  transporter.verify(function(err, succ) {
    if (err) return console.log(err)
    console.log('success')
    return
  })



  try {
    // send mail with defined transport object
    info = await transporter.sendMail({
      from: 'scanner@pmcoc.com', // sender address
      to: "aqil@pmcoc.com", // list of receivers
      subject: "Hello", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });

  } catch(error) {
    console.error(error)
  }
}

module.exports = sendApprovalEmails;
