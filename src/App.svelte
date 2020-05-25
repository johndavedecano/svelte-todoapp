<script>
  import { onMount } from "svelte";

  import { v4 as uuid } from "uuid";

  import store from "./stores/todos.store.js";

  onMount(load);

  let editingId = null;

  let todo = "";

  function load() {
    store.getTodos();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (todo === "") {
      alert("Todo must not be empty");
      return;
    }

    if (editingId) {
      store
        .patchTodo(editingId, { title: todo })
        .then(load)
        .catch(console.log);
    } else {
      store
        .createTodo({ title: todo, isDone: false })
        .then(load)
        .catch(console.log);
    }

    todo = "";
    editingId = null;
  }

  function toggleStatus(id, status) {
    return () => {
      store
        .patchTodo(id, { isDone: !status })
        .then(load)
        .catch(console.log);
    };
  }

  function handleDelete(id) {
    return () => {
      const c = window.confirm("Are you sure you wanna delete this item?");
      if (c) {
        store
          .deleteTodo(id)
          .then(load)
          .catch(console.log);
      }
    };
  }

  function handleEdit(t) {
    return () => {
      todo = t.title;
      editingId = t.id;
    };
  }

  function handleBlur() {
    editingId = null;
  }
</script>

<div class="container">
  <div class="card mb-2">
    <div class="card-header">Add Todo</div>
    <div class="card-body pt-0">
      <form action="/" on:submit={handleSubmit}>
        <div class="form-group mb-2">
          <label for="todo" />
          <input
            type="text"
            name="todo"
            class="form-control"
            placeholder="Add title"
            on:blur={handleBlur}
            disabled={$store.isLoading}
            bind:value={todo} />
        </div>
        <button disabled={$store.isLoading} class="btn btn-block btn-primary">
          {editingId ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
    </div>
  </div>
  <div class="card">
    <div class="card-header">Todo List</div>
    <div class="card-body">
      <table class="table table-hovered">
        <tbody>
          {#each $store.todos as t}
            <tr>
              <td>
                <input
                  bind:checked={t.isDone}
                  type="checkbox"
                  class="checkbox"
                  on:click={toggleStatus(t.id, t.isDone)} />
              </td>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>
                {#if t.isDone}
                  <!-- content here -->
                  <span class="badge badge-success">Done</span>
                {:else}
                  <!-- else content here -->
                  <span class="badge badge-warning">Pending</span>
                {/if}
              </td>
              <td>
                <button on:click={handleEdit(t)} class="btn btn-primary">
                  Edit
                </button>
                <button on:click={handleDelete(t.id)} class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
