import axios from 'axios'

const API = `${process.env.REACT_APP_API}/api/categories`

export async function fetchCategories() {
  const { data } = await axios.get(API)

  return data.categories
};
