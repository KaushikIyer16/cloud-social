import axios from 'axios'

const call = async (method, url, headers = {}, body = {}, params = {}) => {
  try {
    const response = await axios({
      method,
      url,
      params,
      data: body,
      headers,
    })
    return response
  } catch (error) {
    throw error
  }
}

const apiFactory = () => ({
  get: (...args) => call('GET', ...args),
  post: (...args) => call('POST', ...args),
  put: (...args) => call('PUT', ...args),
  delete: (...args) => call('DELETE', ...args),
})

const api = apiFactory()
export default api
