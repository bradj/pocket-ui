<script>
  import Feed from '$components/Feed.svelte';
  import { loggedIn, activeAccount, currentFeed, selectedAccount } from '$store';
  import { onDestroy, beforeUpdate } from 'svelte';
  import { push } from 'svelte-spa-router'; 
  import { getInstanceFeed } from '$api';

  beforeUpdate(async () => {
    window.scrollTo(0, 0);
    const posts = await getInstanceFeed();

    currentFeed.set(posts);
    selectedAccount.set(null);
  });

  const loggedInUnsub = loggedIn.subscribe(value => {
		if (value === false) {
      push('/login');
    }
	});

  const userUnsub = activeAccount.subscribe(value => {
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
