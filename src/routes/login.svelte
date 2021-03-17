<script>
  import { onDestroy} from 'svelte';
  import {login} from '$api';
  import { user } from '$store';
  import { push } from 'svelte-spa-router';

  let username;
  let password;
  
  const unsubscribe = user.subscribe(value => {
		if (!value || !value.username || !value.email) {
      push('/login');
    } else {
      push('/');
    }
	});
  
  async function handleSubmit() {
    await login(username, password);
  }

  onDestroy(unsubscribe);
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
      <form on:submit|preventDefault={handleSubmit}>
      <div class="field">
        <p class="control">
          <input class="input" type="text" placeholder="Username" bind:value="{username}" autofocus>
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
      </form>
    </div>
  </div>
</div>
