<script>
  import Feed from '$components/Feed.svelte';
  import SmallProfile from '$components/SmallProfile.svelte';
  import { selectedUsername } from '$store';
  import { beforeUpdate } from 'svelte';
  import { push } from 'svelte-spa-router';

  export let params = {};
  
  beforeUpdate(() => {
    window.scrollTo(0, 0);
    selectedUsername.set(params.username);
  });
</script>

<svelte:head>
	<title>Pocket - {params.username}</title>
</svelte:head>

<div class="container is-max-desktop">
  <SmallProfile username={params.username} />
  <Feed username={params.username} />
</div>
