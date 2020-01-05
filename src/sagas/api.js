import axios from 'axios'

const API_ROOT = 'https://conduit.productionready.io/api'

axios.defaults.baseURL = API_ROOT
axios.defaults.headers.common['Authorization'] = ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const getResponseData = response => response.data

const Article = {
  findAll: () => axios.get(`${API_ROOT}/articles`).then(getResponseData),
  findBySlug: slug => axios.get(`${API_ROOT}/articles/${slug}`).then(getResponseData)
}

const Tag = {
  getAll: () => axios.get(`${API_ROOT}/tags`).then(getResponseData)
}

export {
  Article,
  Tag
}