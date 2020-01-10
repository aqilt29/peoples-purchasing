// interface with the docusign api here
const docusign = require('docusign-esign');
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

async function sendEnvelopeController (req, res, buffer) {
    console.log(buffer)
    // const qp = req.query;
    // Fill in these constants or use query parameters of ACCESS_TOKEN, ACCOUNT_ID, USER_FULLNAME, USER_EMAIL
    // or environment variables.
    const basePath = "https://demo.docusign.net/restapi";
    // Obtain an OAuth token from https://developers.docusign.com/oauth-token-generator
    const accessToken = process.env.ACCESS_TOKEN
    // Obtain your accountId from demo.docusign.com -- the account id is shown in the drop down on the
    // upper right corner of the screen by your picture or the default picture. 
    const accountId = process.env.ACCOUNT_ID
  
    // Recipient Information:
    const signerName = process.env.USER_FULLNAME
    const signerEmail = process.env.USER_EMAIL
  
    // The document you wish to send. Path is relative to the root directory of this repo.
    const fileName = '../printedPR/8580a810-3390-11ea-b9df-7f69f94cf8e9.pdf';
   /**
     *  The envelope is sent to the provided email address. 
     *  One signHere tab is added.
     *  The document path supplied is relative to the working directory 
     */
    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(basePath);
    apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
    // Set the DocuSign SDK components to use the apiClient object
    docusign.Configuration.default.setDefaultApiClient(apiClient);
  
    // Create the envelope request
    // Start with the request object
    const envDef = new docusign.EnvelopeDefinition();
    //Set the Email Subject line and email message
    envDef.emailSubject = 'Please sign this document sent from the Node example';
    envDef.emailBlurb = 'Please sign this document sent from the Node example.'
  
    // Read the file from the document and convert it to a Base64String
    // const pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName))
    //     , pdfBase64 = pdfBytes.toString('base64');
    
    // Create the document request object
    const doc = docusign.Document.constructFromObject({documentBase64: buffer.toString('base64'),
          fileExtension: 'pdf',  // You can send other types of documents too.
          name: 'Sample document', documentId: '1'});
  
    // Create a documents object array for the envelope definition and add the doc object
    envDef.documents = [doc];
  
    // Create the signer object with the previously provided name / email address
    const signer = docusign.Signer.constructFromObject({name: signerName,
          email: signerEmail, routingOrder: '1', recipientId: '1'});
  
    // Create the signHere tab to be placed on the envelope
    const signHere = docusign.SignHere.constructFromObject({documentId: '1',
          pageNumber: '1', recipientId: '1', tabLabel: 'SignHereTab',
          xPosition: '174', yPosition: '741'});
  
    // Create the overall tabs object for the signer and add the signHere tabs array
    // Note that tabs are relative to receipients/signers.
    signer.tabs = docusign.Tabs.constructFromObject({signHereTabs: [signHere]});
  
    // Add the recipients object to the envelope definition.
    // It includes an array of the signer objects. 
    envDef.recipients = docusign.Recipients.constructFromObject({signers: [signer]});
    // Set the Envelope status. For drafts, use 'created' To send the envelope right away, use 'sent'
    envDef.status = 'sent';
    // Send the envelope
    // The SDK operations are asynchronous, and take callback functions.
    // However we'd pefer to use promises.
    // So we create a promise version of the SDK's createEnvelope method.
    let envelopesApi = new docusign.EnvelopesApi()
        // createEnvelopePromise returns a promise with the results:
      , createEnvelopePromise = promisify(envelopesApi.createEnvelope).bind(envelopesApi)
      , results
      ;
  
    try {
      results = await createEnvelopePromise(accountId, {'envelopeDefinition': envDef})
    } catch  (e) {
      let body = e.response && e.response.body;
      if (body) {
        // DocuSign API exception
        res.send (`<html lang="en"><body>
                    <h3>API problem</h3><p>Status code ${e.response.status}</p>
                    <p>Error message:</p><p><pre><code>${JSON.stringify(body, null, 4)}</code></pre></p>`);
      } else {
        // Not a DocuSign exception
        throw e;
      }
    }
    // Envelope has been created:
    if (results) {
      res.send (`<html lang="en"><body>
                  <h3>Envelope Created!</h3>
                  <p>Signer: ${signerName} &lt;${signerEmail}&gt;</p>
                  <p>Results</p><p><pre><code>${JSON.stringify(results, null, 4)}</code></pre></p>`);
    }
  }

  module.exports = sendEnvelopeController;