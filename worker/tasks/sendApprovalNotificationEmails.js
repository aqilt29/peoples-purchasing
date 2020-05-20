/*
  This task will send notification emails after everyone has approved it
*/

const mongoose = require('mongoose');
const hostName = process.env.HOST;
const Request = require('../../db/models/request');
const User = require('../../db/models/user');
const transporter = require('../utils/emailTransporter');
const _ = require('lodash');

const sendApprovalNotifications = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  console.log('approved Document ID', id)

  const approvedRequest = await Request.findById(id)
    .populate('user')
    .populate('buyer')
    .populate('submittedFor');

  console.log('approved request ->', approvedRequest);

  console.log('approved request approverList', approvedRequest.approverList);

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
