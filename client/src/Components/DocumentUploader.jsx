import React from 'react';
import S3 from 'aws-s3';
import { useParams } from 'react-router-dom';
import sanitize from 'sanitize-filename';

const configGenerator = (dirName) => ({
  dirName,
  region: 'us-west-1',
  bucketName: 'purchasing-portal-documents',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const DocumentUploader = ({ attachUploadLocation, prefix }) => {

  const { id: documentId } = useParams();


  const S3Client = new S3(configGenerator(documentId));

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fileToUpload = e.target.documentInput.files[0];

    const newFileName = sanitize(window.prompt('Please enter name for this file').trim().replace(/[^a-z0-9]/gi, '_').toLowerCase());

    if (!newFileName || newFileName.length < 1) {
      window.alert('Invalid File Name. Try Again');
      return
    }

    console.log(`${newFileName}_REQ-${documentId.slice(-5)}`)

    const documentKey = `${newFileName}_${prefix}-${documentId.slice(-5)}`;

    // try to upload the renamed file to S3 in a folder with the id of the request doc id
    let data;
    try {
      data = await S3Client.uploadFile(fileToUpload, documentKey)
    } catch (error) {
      window.alert(error)
      return
    }

    //  console log the url for reference later
    console.log(data.location)

    // try to send the location to the api to save as a data point on the request
    //  on success, reload the page
    let responseData;
    try {
      responseData = await attachUploadLocation(documentId, data.location);
      console.log(responseData)
      window.location.reload();
    } catch (error) {
      window.alert(error);
      return
    }


  }




  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="documentInput"
          className="my-2"
          type="file"
        />
        <button>Submit</button>
      </form>
    </>
  )
}

export default DocumentUploader;