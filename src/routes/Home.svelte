<script>
  import Feed from '$components/Feed.svelte';
  import { loggedIn,loggedInUser } from '$store';
  import { onDestroy, beforeUpdate } from 'svelte';
  import { push } from 'svelte-spa-router';  

  beforeUpdate(() => {
    window.scrollTo(0, 0);
  });

  const loggedInUnsub = loggedIn.subscribe(value => {
		if (value === false) {
      push('/login');
    }
	});

  const userUnsub = loggedInUser.subscribe(value => {
		if (!value) {
      push('/login');
    }
	});
  
  onDestroy(loggedInUnsub);
  onDestroy(userUnsub);
</script>

<svelte:head>
	<title>Pocket</title>
</svelte:head>

<div class="container is-max-desktop">
  <Feed />
</div>
