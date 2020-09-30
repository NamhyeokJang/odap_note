import axios from 'axios'

const API = `${process.env.REACT_APP_API}/api/question`

export async function modifyQuestion(id, modify) {
  await axios.put(`${API}/${id}`, { ...modify })
}

export async function deleteQuestion(id) {
  const { data } = await axios.delete(`${API}/${id}`)

  return data
}