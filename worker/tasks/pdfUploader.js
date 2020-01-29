/*
  This task will be called by a worker to create two pdf buffers and upload them to S3
  one will be the PR and the other will be a PO pdf.

  Once the two are uploaded this task will send to the queue that it is ready to email approval notifications
*/