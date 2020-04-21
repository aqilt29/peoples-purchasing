import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/purchaseorders' : `${process.env.API_PATH}/purchaseorders`;

export const submitPO = async (postData) => {
  console.log(postData)

  const { data } = await axios.post(`${apiPath}`, postData)
  return data

};

export const getAllPOs = async () => {
  const { data } = await axios.get(`${apiPath}`)
  console.log(data)
  return data;
};

export const searchPoById = async (lookupId) => {
  const { data } = await axios.post(`${apiPath}/search`, { lookupId });

  console.log(data)

  return data
};

export const getPoById = async (id) => {
  const data = await axios.get(`${apiPath}/${id}`)
  console.log(data)
  return data;
}

export const attachPOUploadLocation = async (id, locationURL) => {
  console.log(id, location, '<--- in api upload document');

  const { data } = await axios.post(`${apiPath}/upload/${id}`, { locationURL })

  console.log(data, locationURL)
  return data
}