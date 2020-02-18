/*
[ { email: 'lreth@pmcoc.com', isApproved: false, isSent: true } ]
  This task will email out emails based on the document to ask for approval
  taking a document ID as a parameter from the message it will look up the document and then do the work
*/
const hostName = process.env.HOST || 'http://localhost:9000'
// let testPattern = [ { email: 'aqil@pmcoc.com', isApproved: false, isSent: true }, { email: 'login@pmcoc.com', isApproved: false, isSent: false } ]
const Request = require('../../db/models/request');
const nodemailer = require('nodemailer');

const sendApprovalEmails = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  console.log(id, ' <--- id')
  const data = await Request.findById(id);
  console.log(data.approverList, '<---11')
  // create reusable transporter object using the default SMTP transport
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.office365.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: process.env.SMTP_EMAIL, // generated ethereal user
  //     pass: process.env.SMTP_PASSWORD // generated ethereal password
  //   },
  //   requireTLS: true
  // });

  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    auth: {
        user: 'project.1',
        pass: 'secret.1'
    }
  });

  //  iterate over the approver list
  for (let i = 0; i < data.approverList.length; i++) {
    //  find in the approval list for the next approver
    if (!data.approverList[i].isSent) {
      try {
        // send mail with defined transport object
        await transporter.sendMail({
          from: { name: "PMCOC PR Approvals", address:'scanner@pmcoc.com' }, // sender address
          to: data.approverList[i].email, // list of receivers
          subject: "Purchase Requisition Approval", // Subject line
          // text: JSON.stringify(data), // plain text body
          html: `<a href="${hostName}/purchasing/view/5e4b247b6408a213e24340be/5e4b247b6408a213e24340c0">Click Here to View Request</a>` // html body
        });

        console.log(data.approverList[i].isSent, "before")
        data.approverList[i].isSent = true;
        data.markModified('approverList');

        let save = await data.save();

        console.log(data.approverList[i].isSent, "hi")
        console.log(save, "save")
        break;
      } catch(error) {
        console.error(error, "err")
      }
    }
  }
  //  will probably have to try iterating over the approver list to generate the correct html
}

module.exports = sendApprovalEmails;
