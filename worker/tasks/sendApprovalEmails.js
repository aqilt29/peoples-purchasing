const mongoose = require('mongoose');
const hostName = process.env.HOST;
const transporter = require('../utils/emailTransporter');
const Request = require('../../db/models/request');
const Vendor = require('../../db/models/vendor');
const User = require('../../db/models/user');
const Entity = require('../../db/models/entity');

const sendApprovalEmails = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  console.log(id, ' <--- id')
  const requestAwaitingApproval = await Request.findById(id).populate('vendor').populate('user').populate('entity').populate('buyer');

  //  iterate over the approver list
  for (let i = 0; i < requestAwaitingApproval.approverList.length; i++) {
    //  find in the approval list for the next approver
    if (!requestAwaitingApproval.approverList[i].isSent) {

      //  try to look up the userID of the next approver and mark them to the delegate field
      const approverObject = requestAwaitingApproval.approverList[i];
      let approvingUser = null;
      try {
        approvingUser = await User.find({ email: approverObject.email });
        console.log(`approvingUser => ${JSON.stringify(approvingUser)}`)
      } catch (error) {

        // try to communicate the error to myself for tracking
        console.log(error)
        await transporter.sendMail({
          from: { name: "Purchasing Portal Notification", address:'scanner@pmcoc.com' },
          to: 'aqil@pmcoc.com',
          subject: 'Error in approving user lookup',
          html: `${error}`
        })
      }

      //  try to send the email and mark the approver list and save the request
      try {

        //  get the id for the approver subdoc
        const approverId = requestAwaitingApproval.approverList[i]._id
        // send mail with defined transport object
        await transporter.sendMail({
          from: { name: "Purchasing Portal Notification", address:'scanner@pmcoc.com' }, // sender address
          to: requestAwaitingApproval.approverList[i].email, // list of receivers
          subject: `PR Approval Required: REQ-${requestAwaitingApproval.id.slice(-5).toUpperCase()} to ${requestAwaitingApproval.vendor.name} for $${requestAwaitingApproval.invoiceTotal}`, // Subject line
          // text: JSON.stringify(requestAwaitingApproval), // plain text body
          html: `<a href="${hostName}/purchasing/view/${id}/${approverId}">Click Here to View Request</a>` // html body
        });

        console.log(requestAwaitingApproval.approverList[i].isSent, "before")
        requestAwaitingApproval.approverList[i].isSent = true;
        requestAwaitingApproval.approverList[i].dateSent = Date.now();
        requestAwaitingApproval.markModified('approverList');

        let save = await requestAwaitingApproval.save();

        console.log(requestAwaitingApproval.approverList[i].isSent, "<--- isSent")
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
