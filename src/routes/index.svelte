<script lang="ts" context="module">
	export const preload: Preload = async function(this, page, session) {
		const { user } = session;

		if (!user) {
			return this.redirect(302, 'login'); // TypeScript will know the type of `this` now
		}

    const res = await this.fetch(`/u/${user.username}`);
    const feed = await res.json();

    console.log(feed);

		return { user, feed };
	}
</script>

<script lang="ts">
  export let user = {};
  export let posts = [];
</script>

<style>

</style>

<svelte:head>
	<title>Pocket</title>
</svelte:head>

<h1>Great success, {user.username}!</h1>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
