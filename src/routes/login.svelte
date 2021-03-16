<script lang="ts">
  import { goto,stores } from "@sapper/app";


  const { session } = stores();
  let username: string;
  let password: string;

	// export async function preload({ params }) {
	// 	if (session && session.user) {
	// 		return this.redirect(302, '/'); // TypeScript will know the type of `this` now
	// 	}
	// }

  async function handleSubmit() {
    const res = await fetch('/login', {
      method: 'post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}
    });

    const parsed = await res.json();

    console.log('parsed', parsed);

    if (res) {
      $session.user = parsed.user;
      goto("/");
    }
  }
</script>

<style>
</style>

<svelte:head>
	<title>Pocket - Login</title>
</svelte:head>

<div class="columns">
  <div class="column is-3">
    <h1 class="title">Pocket Login</h1>
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
