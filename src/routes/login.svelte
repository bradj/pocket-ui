<script>
  import {login} from '$api';
  let username;
  let password;

  async function handleSubmit() {
    await login(username, password);
  }
</script>

<style>
</style>

<svelte:head>
	<title>Pocket - Login</title>
</svelte:head>

<div class="container">
  <div class="columns">
    <div class="column is-3">
      <h1 class="title">Login</h1>
      <h2 class="subtitle">Enter your username and password</h2>
      <div class="field">
        <p class="control">
          <input class="input" type="text" placeholder="Username" bind:value="{username}">
        </p>
      </div>
      <div class="field">
        <p class="control">
          <input class="input" type="password" placeholder="Password" bind:value="{password}">
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" on:click="{handleSubmit}">
            Login
          </button>
        </p>
      </div>
    </div>
  </div>
</div>
