import axios from 'axios'

const API = `${process.env.REACT_APP_API}/api/questions`

export async function fetchQuestions(type) {
  const { data } = await axios.get(`${API}/${type}`)

  return data.questions
}