//  this file needs an api for getting a list of all vendors and creating one
import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/vendors' : `${process.env.API_PATH}/vendors`;

export const createVendor = async (vendorData) => {

  let info = null;

  try {
    info = await axios.post(`${apiPath}/`, { ...vendorData })
  } catch (error) {
   window.alert(error)
  }

  return info.data || [];
};

export const deleteVendor = async (id) => {
  let data;

  try {
    data = await axios.delete(`${apiPath}/${id}`)
  } catch (error) {
    window.alert(error)
  }

  return data.data || [];
};

export const getVendorList = async () => {
  let data;

  try {
    data = await axios.get(`${apiPath}/`)
  } catch (error) {
    window.alert(error)
  }

  return data.data || [];
};

export const getVendorById = async (id) => {
  let data;

  try {
    data = await axios.get(`${apiPath}/${id}`)
  } catch (error) {
    window.alert(error)
  }

  return data.data || [];
};

export const modifyVendor = async (id, data) => {
  let responseData;

  try {
    responseData = await axios.patch(`${apiPath}/${id}`, {...data})
  } catch (error) {
    window.alert(error)
  }

  return responseData.data || [];
};