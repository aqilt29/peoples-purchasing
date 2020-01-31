/*
  This the file that imports all of the tasks and polls the queue
  This function will use the https://github.com/bbc/sqs-consumer package
    the message will be read and then determines to run tasks as follows:
      1. Send Approval Emails
      2. Send Notification of Pass/Fail Emails
      3. Upload the PR and PO to S3

  The tasks will take the document ID as an argument and use the DB
  as the single source of truth for their purposes.

  Errors should be handled by using nodemailer to send an email to IT
  with the info that wasn't able to be saved or sent.
  sqs-consumer provides an easy API for this

*/
require('dotenv').config();
const path = require('path');
const aws = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const connectdb = require('../db/index');
const sendApprovalEmails = require('./tasks/sendApprovalEmails');


//  configure aws sdk with credentials for user
aws.config.loadFromPath(path.resolve(__dirname, '../aws_config.json'));

//  instance of SQS class
const sqs = new aws.SQS();

const worker = Consumer.create({
  queueUrl: process.env.QUEUE_URL,
  handleMessage: async (message) => {
    const { Body } = message;

    if (Body === 'sendApprovalEmails') {
      await sendApprovalEmails(message)
      return
    }

    console.log('no match for message')
    return
  },
  messageAttributeNames: ['All']
})


worker.on('error', (err) => {
  console.error(err.message);
});

worker.on('processing_error', (err) => {
  console.error(err.message);
});

worker.on('timeout_error', (err) => {
 console.error(err.message);
});

worker.on('message_received', (message) => {
 console.log(`received ${message.Body}`)
});

worker.on('message_processed', ({ MessageAttributes: { documentId: { StringValue: attribute }}}) => console.log('processed: ',attribute))

connectdb().then(() => {
  console.log('db connected')
  worker.start()
})