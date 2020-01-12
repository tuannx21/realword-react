import axios from 'axios'

const API_ROOT = 'https://conduit.productionready.io/api'

axios.defaults.baseURL = API_ROOT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const getResponseData = response => response.data

const setToken = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Token ${token}` : ''
}

const Article = {
  findAll: (params = {}) => axios.get(`/articles`, { params }).then(getResponseData),
  findAllFeed: (params = {}) => axios.get(`/articles/feed`, { params }).then(getResponseData),
  findBySlug: slug => axios.get(`/articles/${slug}`).then(getResponseData),
  create: article => axios.post(`/articles`, article).then(getResponseData),
  update: (slug, article) => axios.put(`/articles/${slug}`, article).then(getResponseData),
  delete: slug => axios.delete(`/articles/${slug}`),
  favorite: slug => axios.post(`/articles/${slug}/favorite`).then(getResponseData),
  unfavorite: slug => axios.delete(`/articles/${slug}/favorite`).then(getResponseData),
}

const Tag = {
  findAll: () => axios.get(`/tags`).then(getResponseData)
}

const Auth = {
  login: user => axios.post(`/users/login`, { user }).then(getResponseData),
  register: user => axios.post(`/users`, { user }).then(getResponseData)
}

const User = {
  getCurrent: () => axios.get(`/user`).then(getResponseData),
  update: user => axios.put(`/user`, { user }).then(getResponseData),
  getProfile: username => axios.get(`/user/${username}`).then(getResponseData),
  follow: username => axios.post(`/user/${username}/follow`).then(getResponseData),
  unfollow: username => axios.delete(`/user/${username}/follow`).then(getResponseData)
}

const Comment = {
  findAll: slug => axios.get(`/articles/${slug}/comments`).then(getResponseData),
  create: (slug, comment) => axios.post(`/articles/${slug}/comments`, comment).then(getResponseData),
  delete: (slug, commentId) => axios.delete(`/articles/${slug}/comments/${commentId}`)
}

export {
  Article,
  Tag,
  Auth,
  User,
  Comment,
  setToken
}