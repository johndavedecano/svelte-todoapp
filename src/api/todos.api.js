import axios from 'axios'

axios.defaults.baseURL = 'http://a6ef48a6.ngrok.io'

const getTodos = () => {
  return axios.get('/api/todos').then((response) => response.data)
}

const getTodo = (id) => {
  return axios.get(`/api/todos/${id}`).then((response) => response.data)
}

const createTodo = (params = {}) => {
  return axios.post('/api/todos', params).then((response) => response.data)
}

const putTodo = (id, params = {}) => {
  return axios.put(`/api/todos/${id}`, params).then((response) => response.data)
}

const patchTodo = (id, params = {}) => {
  return axios
    .patch(`/api/todos/${id}`, params)
    .then((response) => response.data)
}

const deleteTodo = (id) => {
  return axios.delete(`/api/todos/${id}`).then((response) => response.data)
}

export default {
  getTodos,
  getTodo,
  createTodo,
  putTodo,
  patchTodo,
  deleteTodo,
}
