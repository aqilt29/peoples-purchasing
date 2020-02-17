import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/requests' : null;

export const createNewRequest = async ({ shipTo, billTo, entity, businessUnit, ...data}) => {
  const postData = {
    address: {
      shipTo,
      billTo,
    },
    entity: {
      name: entity,
      businessUnit,
    },
    ...data
  }
  console.log('->>> post data',postData)
  const request = await axios.post(`${apiPath}/`, postData);
  console.log(request);
  return request;
};
