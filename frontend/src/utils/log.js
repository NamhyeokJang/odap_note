import axios from 'axios'

const API = `${process.env.REACT_APP_API}/api/log`

export async function createLog(id, type) {
  await axios.post(API, { questionId: id, type: type })
}
