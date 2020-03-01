import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/items' : `${process.env.API_PATH}/items`;

export const getItemById = async (itemId, documentId) => {
  const { data } = await axios.get(`${apiPath}/${itemId}/${documentId}`)
  console.log(data)
  return data;
};