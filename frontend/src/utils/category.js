import axios from 'axios'

const API = `${process.env.REACT_APP_API}/api/category`

/* Fetch Category data */
export async function fetchCategory(id, query) {
  query = query ? query : ''
  const { data } = await axios.get(`${API}/${id}${query}`)

  return data.category
}

/* create Category */
export async function createCategory(title) {
  const { data } = await axios.post(API, { title: title })

  return data
}

/* create Questions By CategoryId */
export async function createQuestions(id, questions) {
  const { data } = await axios.post(`${API}/${id}`, { questions })

  return data.questions
}

/* delete Category */
export async function deleteCategory(id) {
  const { data } = await axios.delete(`${API}/${id}`)

  return data
}

export async function modifyCategory(id, modify) {
  await axios.put(`${API}/${id}`, { ...modify })
}