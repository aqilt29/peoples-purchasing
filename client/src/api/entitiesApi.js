const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api' : null;
import axios from 'axios'

export const getAllEntities = async () => {

  const { data } = await axios.get(`${apiPath}/entities`)
  console.log(data)
  return data
}