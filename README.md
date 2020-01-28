# People's Purchasing App

In the interest of good business sense and to gain clarity:
This application is built for Peoples to tracking spending and requests and provide approval systems.
It will integrate technologies from familiar sources to make this work.

The goal is to let the employee login, make purchase requests, collect the appropiate approvals, and generate a PR and PO stored in the cloud for review later. In addition to tracking the status of that PO after goods have been received to allow accounting to better track cashflow.

## The Technologies to Integrate

1. MongoDB
  * For storing the request data in a format that can be easily accessed later
  * To allow for quick changes on the fly to future data models
  * Will store the state of the requests throughout the life cycle
  * One server running on a different instance will server as the single source of truth

2. React
  * An index.html will be served up by an express service that will collect a bundle from CDN

3. AWS SQS
  * SQS will be used to queue heavy jobs so the IO isn't blocked on the express server

4. AWS EC2
  * EC2's will host each service on T2.micros
  * Elastic IP will be necessary for each of the services.

5. NodeMailer
  * For emailing all of the managers using Scanner@pmcoc.com creds.


## Service Design

The entire service will consist of a Listener/Broker for the Api and additional Workers that will carry out the tasks queued by the broker into SQS.

1. Listener/Broker Responsibilities
    * Exposing the REST API to the client
    * Listen for approval requests && update state
    * Queue jobs based on state changes
    * Serve index.html to client

2. Approval Email Worker
    1. Take document ID from Queue
    2. Lookup document PR on ID
    3. Build Email
        * HTML for email with approval API buttons
        * Attachment PR as HTML *iOS can render the HTML*
    4. Look up managers
    5. Email all of the managers
    6. Delete Item from SQS

3. Approval Notification Worker
    1. take document ID from Queue
    2. Lookup document PR on ID
    3. Build Email
        * HTML Template with links to documents
    4. Look up managers
    5. Email all of the managers
    6. Delete Item from SQS

4. PDF Uploader Worker
    1. Take document ID from SQS
    2. Lookup document PR on ID
    3. Generate HTML templates
        1. PR Document in HTML
        2. PO Document in HTML
    4. Generate PDF
        1. PR Document in PDF
        2. PO Document in PDF
    5. Upload documents to S3
    6. Update State on Document for links
    7. Notify Broker of Completion of upload
    8. Delete item from SQS


## Startup Script

In order for the server to start you need an env file
```
MONGO_INITDB_ROOT_USERNAME=*
MONGO_INITDB_ROOT_PASSWORD=*
DB_HOST=127.0.0.1
PORT=*
```


- `npm start` — This will start the webpack-dev-server on Port: `9000`.
- `npm run build` — This will run webpack and watch for file changes and bundle into the `dist` directory
- `npm run dev` - this will start nodemon to watch `server/index/js`
- `npm run dev:db` OR `docker-compose up` will start a mongoDB instance, must have docker

