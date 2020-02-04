/*
  This task will email out emails based on the document to ask for approval
  taking a document ID as a parameter from the message it will look up the document and then do the work
*/
const Request = require('../../db/models/request');
const nodemailer = require('nodemailer');

const sendApprovalEmails = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  const { approverList, ...rest } = await Request.findById(id);
  console.log(approverList)
  const demoList = ['lreth@pmcoc.com', 'kip@pmcoc.com', 'larena@pmcoc.com', 'aqil@pmcoc.com', 'beeta@pmcoc.com', 'anthony@pmcoc.com']
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    },
    requireTLS: true
  });

  //  will probably have to try iterating over the approver list to generate the correct html
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: { name: "PMCOC PR Approvals", address:'scanner@pmcoc.com' }, // sender address
      to: demoList, // list of receivers
      subject: "Purchase Requisition Approval", // Subject line
      text: JSON.stringify(rest), // plain text body
      // html: "<button>Collect Prize!</button>" // html body
    });
  } catch(error) {
    console.error(error)
  }
}

module.exports = sendApprovalEmails;
