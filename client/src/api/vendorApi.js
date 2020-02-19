//  this file needs an api for getting a list of all vendors and creating one
import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/vendors' : null;

export const createVendor = async (vendorData) => {

  let info = null;

  try {
    info = await axios.post(`${apiPath}/`, { ...vendorData })
  } catch (error) {
   window.alert(error)
  }

  return info.data || error;
};

export const deleteVendor = async (id) => {

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