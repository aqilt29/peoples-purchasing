/*
  This task will send out the denied emails after the worker receives the task.
*/
const mongoose = require('mongoose')
const hostName = process.env.HOST;
// let testPattern = [ { email: 'aqil@pmcoc.com', isApproved: false, isSent: true }, { email: 'login@pmcoc.com', isApproved: false, isSent: false } ]
const Request = require('../../db/models/request');
const User = require('../../db/models/user');
const nodemailer = require('nodemailer');
const _ = require('lodash');

const sendDeniedNotifications = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  console.log('Denied Document ID', id)

  const deniedRequest = await Request.findById(id)
    .populate('user')
    .populate('submittedFor');

  console.log('denied request ->', deniedRequest);

  console.log('denied request approverList', deniedRequest.approverList);

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

  // const transporter = nodemailer.createTransport({
  //   host: 'localhost',
  //   port: 1025,
  //   auth: {
  //       user: 'project.1',
  //       pass: 'secret.1'
  //   }
  // });


  //  the people that need to know it has been denied are all on the approver list
  //  and the person who made it and the person who it was submitted for

  const emailAddresses = [];

  // loop through the approver list and add emailAddresses
  deniedRequest.approverList.forEach(({ email }) => emailAddresses.push(email));

  emailAddresses.push(deniedRequest.user.email)
  emailAddresses.push(deniedRequest.submittedFor.email)

  deniedRequest.status = 'Denied';
  deniedRequest.markModified('status');
  deniedRequest.save();

  try {
    await transporter.sendMail({
      from: { name: "PMCOC PR Approvals", address:'scanner@pmcoc.com' }, // sender address
      to:  _.uniq(emailAddresses), // list of receivers
      subject: "Purchase Requisition Has Been Denied", // Subject line
      // text: JSON.stringify(data), // plain text body
      html: `<a href="${hostName}/purchasing/view/${id}">Click Here to View Denied Request</a>` // html body
    });
  } catch (error) {
    console.error(error);
    await transporter.sendMail({
      from: { name: "PMCOC PR Approvals", address:'scanner@pmcoc.com' }, // sender address
      to:  'aqil@pmcoc.com', // list of receivers
      subject: "Purchase Requisition Has Been Denied ERROR", // Subject line
      // text: JSON.stringify(data), // plain text body
      html: `<a href="${hostName}/purchasing/view/${id}">Click Here to View Denied Request</a>` // html body
    })
  }



};

module.exports = sendDeniedNotifications;
