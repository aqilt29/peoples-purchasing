const mongoose = require('mongoose');
const hostName = process.env.HOST;
const transporter = require('../utils/emailTransporter');
const Request = require('../../db/models/request');
const Vendor = require('../../db/models/vendor');
const User = require('../../db/models/user');
const Entity = require('../../db/models/entity');

const sendApprovalEmails = async ({ MessageAttributes: { documentId: { StringValue: id }}}) => {
  console.log(id, ' <--- id')
  const data = await Request.findById(id).populate('vendor').populate('user').populate('entity').populate('buyer');

  //  iterate over the approver list
  for (let i = 0; i < data.approverList.length; i++) {
    //  find in the approval list for the next approver
    if (!data.approverList[i].isSent) {
      try {

        //  get the id for the approver subdoc
        const approverId = data.approverList[i]._id
        // send mail with defined transport object
        await transporter.sendMail({
          from: { name: "Purchasing Portal Notification", address:'scanner@pmcoc.com' }, // sender address
          to: data.approverList[i].email, // list of receivers
          subject: `PR Approval Required: REQ-${data.id.slice(-5).toUpperCase()} to ${data.vendor.name} for $${data.invoiceTotal}`, // Subject line
          // text: JSON.stringify(data), // plain text body
          html: `<a href="${hostName}/purchasing/view/${id}/${approverId}">Click Here to View Request</a>` // html body
        });

        console.log(data.approverList[i].isSent, "before")
        data.approverList[i].isSent = true;
        data.approverList[i].dateSent = Date.now();
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
