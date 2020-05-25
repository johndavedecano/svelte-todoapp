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
    return Api.getTodos(params)
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
    return Api.getTodo(id).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const createTodo = (params = {}) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.createTodo(params).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const putTodo = (id, params = {}) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.putTodo(id, params).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const patchTodo = (id, params = {}) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.patchTodo(id, params).finally(() => {
      update((p) => ({ ...p, isLoading: false }))
    })
  }

  const deleteTodo = (id) => {
    update((p) => ({ ...p, isLoading: true }))
    return Api.deleteTodo(id).finally(() => {
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
    subscribe,
  }
}

export default createStore()
