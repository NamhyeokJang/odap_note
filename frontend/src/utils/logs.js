import axios from 'axios'

const API = `${process.env.REACT_APP_API}/api/logs`

export async function fetchLogs() {
  const { data } = await axios.get(API)
  return {
    count: data.count,
    logs: data.logs,
  }
}