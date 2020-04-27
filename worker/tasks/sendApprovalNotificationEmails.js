/*
  This task will send notification emails after everyone has approved it
*/

/*
  This task will send out the approved emails after the worker receives the task.
*/
const mongoose = require('mongoose')
const hostName = process.env.HOST;
// let testPattern = [ { email: 'aqil@pmcoc.com', isApproved: false, isSent: true }, { email: 'login@pmcoc.com', isApproved: false, isSent: false } ]
const Request = require('../../db/models/request');
const User = require('../../db/models/user');
const nodemailer = require('nodemailer');
const _ = require('lodash');

const sendApprovalNotifications = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  console.log('approved Document ID', id)

  const approvedRequest = await Request.findById(id)
    .populate('user')
    .populate('buyer')
    .populate('submittedFor');

  console.log('approved request ->', approvedRequest);

  console.log('approved request approverList', approvedRequest.approverList);

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


  //  the people that need to know it has been approved are all on the approver list
  //  and the person who made it and the person who it was submitted for

  const emailAddresses = [];

  // loop through the approver list and add emailAddresses
  approvedRequest.approverList.forEach(({ email }) => emailAddresses.push(email));

  emailAddresses.push(approvedRequest.user.email)
  emailAddresses.push(approvedRequest.buyer.email)
  emailAddresses.push(approvedRequest.submittedFor.email)

  approvedRequest.status = 'Approved';
  approvedRequest.markModified('status');
  approvedRequest.save();

  await transporter.sendMail({
    from: { name: "Purchasing Portal Notification", address:'scanner@pmcoc.com' }, // sender address
    to:  _.uniq(emailAddresses), // list of receivers
    subject: `REQ-${approvedRequest.id.slice(-5).toUpperCase()}`, // Subject line
    // text: JSON.stringify(data), // plain text body
    html: `<a href="${hostName}/purchasing/view/${id}">REQ-${approvedRequest.id.slice(-5).toUpperCase()} Approved, Click Here to View</a>` // html body
  });



};

module.exports = sendApprovalNotifications;
