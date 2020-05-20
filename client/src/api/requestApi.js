import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/requests' : `${process.env.API_PATH}/requests`;

export const createNewRequest = async ({ shipTo, submittedFor, ...data}) => {
  console.log(shipTo, 'yolo');

  const postData = {
    address: {
      shipTo
    },
    submittedFor: submittedFor ? submittedFor : undefined,
    ...data
  }

  console.log('->>> post data',postData)
  const request = await axios.post(`${apiPath}/`, postData);
  console.log(request);
  return request;
};

export const getAllRequests = async () => {
  const { data: allRequests } = await axios.get(`${apiPath}/`)
  console.log(allRequests)

  return allRequests
};

export const getAllRequestsByUser = async ({ _id, email }) => {
  console.log(email)
  const allRequests = await axios.get(`${apiPath}/user/${_id}`, {
    params: { email }
  })
  console.log(allRequests)
  return allRequests
};

export const getRequestById = async (id) => {
  console.log(id)
  const request = await axios.get(`${apiPath}/${id}`)

  return request;
}

export const approveRequest = async (id, email, approverId) => {
  console.log(id, email, '<--- in apo');

  const { data } = await axios.post(`${apiPath}/approve/${id}`, {
    params: { email, approverId }
  })

  console.log(data)
  return data
}

export const denyRequest = async (id, _, approverId, reason) => {
  console.log(id, reason, '<--- in apo');

  const { data } = await axios.post(`${apiPath}/deny/${id}`, {
    params: { approverId, reason }
  })

  console.log(data)
  return data
}

export const askForRequestApproval = async (id) => {
  console.log(id, '<--- in api ask for approval');

  const { data } = await axios.post(`${apiPath}/${id}`)

  console.log(data)
  return data
};

export const attachUploadLocation = async (id, locationURL) => {
  console.log(id, location, '<--- in api upload document');

  const { data } = await axios.post(`${apiPath}/upload/${id}`, { locationURL })

  console.log(data, locationURL)
  return data
}

export const searchRequestById = async (lookupId) => {
  const { data } = await axios.post(`${apiPath}/search`, { lookupId });

  console.log(data)

  return data
};

export const getValidReqs = async (lookupId) => {
  const { data } = await axios.post(`${apiPath}/approved/nopo`, { lookupId })
  console.log(data)
  return data;
};