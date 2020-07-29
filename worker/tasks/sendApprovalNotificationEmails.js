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

  const approvedRequest = await Request.findById(id).populate('user')

  console.log('approved request ->', approvedRequest);

  const emailAddresses = [];

  emailAddresses.push(approvedRequest.user.email)

  approvedRequest.status = 'Approved';
  approvedRequest.markModified('status');
  approvedRequest.save();

  await transporter.sendMail({
    from: { name: "Purchasing Portal Notification", address:'scanner@pmcoc.com' }, // sender address
    to:  _.uniq(emailAddresses), // list of receivers
    replyTo: 'requestinbox@pmcoc.com',
    subject: `REQ-${approvedRequest.id.slice(-5).toUpperCase()} Approved, Take Action`, // Subject line
    // text: JSON.stringify(data), // plain text body
    html: `<a href="${hostName}/purchasing/details/${id}">REQ-${approvedRequest.id.slice(-5).toUpperCase()} Approved, Click Here to View</a>` // html body
  });



};

module.exports = sendApprovalNotifications;
