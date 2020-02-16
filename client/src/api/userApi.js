import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api/users' : null;

export const getUserByEmail = async (email) => {
  const user = await axios.get(`${apiPath}/search/?email=${email}`);
  return user;
};

export const createNewUser = async ({ costCenter, email, firstName, lastName, auth0Id, entity, role}) => {
  const user = await axios.post(`${apiPath}/`, {
    email,
    firstName,
    lastName,
    auth0Id,
    costCenter,
    entity,
    role
  })

  return user;
}

export const getAllUsers = async () => {
  let data = null;

  try {
    data = await axios.get(`${apiPath}/`)
  } catch (error) {
    window.alert(error)
  }

  return data.data || []
};

export const getApprovedSigners = async () => {
  let data = null;

  try {
    data = await axios.get(`${apiPath}/approving/`)
  } catch (error) {
    window.alert(error)
  }

  return data.data || []
};
