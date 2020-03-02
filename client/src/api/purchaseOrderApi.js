import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/purchaseorders' : `${process.env.API_PATH}/purchaseorders'`;

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

