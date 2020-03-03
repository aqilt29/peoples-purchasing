const apiPath = process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api' : `${process.env.API_PATH}/entities`;
import axios from 'axios'

export const getAllEntities = async () => {

  const { data } = await axios.get(`${apiPath}`)
  console.log(data)
  return data
}