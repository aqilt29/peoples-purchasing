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