import axios from 'axios';

const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400' : null;

export const getUserByEmail = async (email) => {
  const user = await axios.get(`${apiPath}/users/?email=${email}`);
  return user;
};
