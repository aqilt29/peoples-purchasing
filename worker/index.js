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
const Request = require('../db/models/request');

//  configure aws sdk with credentials for user
aws.config.loadFromPath(path.resolve(__dirname, '../aws_config.json'));

//  instance of SQS class
const sqs = new aws.SQS();

// How to use promises with aws
// sqs.listQueues().promise().then(console.log)

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const queueParams = (task, documentId) => ({
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: `${task}`,
    MessageAttributes: {
      'documentId': {
        DataType: 'String',
        StringValue: documentId,
      }
    },
})

const worker = Consumer.create({
  queueUrl: process.env.QUEUE_URL,
  handleMessage: async (message) => {
    const { Body, MessageAttributes: { documentId: { StringValue: attribute }}} = message;

    console.log(Body)

    const requestToUpdate = Request.findById(attribute)

    console.log(attribute);

    await sleep(5000)
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

worker.on('message_processed', ({ MessageAttributes: { documentId: { StringValue: attribute }}}) => console.log('processed: ',attribute))

connectdb().then(() => {
  console.log('db connected')
  worker.start()
})