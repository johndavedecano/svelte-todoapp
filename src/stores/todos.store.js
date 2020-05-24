import { writable } from 'svelte/store'

import Api from './../api/todos.api'

function createStore() {
  const { subscribe, update } = writable({
    isLoading: false,
    isLoaded: false,
    todos: [],
  })

  subscribe((data) => console.log(data))

  const getTodos = (params = {}) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.getTodos('/api/todos', params)
      .then((todos) => {
        console.log(todos)
        update((p) => ({ ...p, todos, isLoaded: true }))
      })
      .finally(() => {
        update((p) => ({ ...p, isLoading: false }))
      })
  }

  const getTodo = (id) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.getTodo(`/api/todos/${id}`).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const createTodo = (params = {}) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.createTodo('/api/todos', params).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const putTodo = (id, params = {}) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.putTodo(`/api/todos/${id}`, params).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const patchTodo = (id, params = {}) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.patchTodo(`/api/todos/${id}`, params).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const deleteTodo = (id) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.deleteTodo(`/api/todos/${id}`).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  return {
    getTodos,
    getTodo,
    createTodo,
    putTodo,
    patchTodo,
    deleteTodo,
  }
}

export default createStore()
