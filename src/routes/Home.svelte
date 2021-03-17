<script>
  import Feed from '$components/Feed.svelte';
import { loggedIn,user } from '$store';
import { onDestroy } from 'svelte';
import { push } from 'svelte-spa-router';

  
  const loggedInUnsub = loggedIn.subscribe(value => {
		if (value === false) {
      push('/login');
    }
	});

  const userUnsub = user.subscribe(value => {
		if (!value) {
      push('/login');
    }
	});
  
  onDestroy(loggedInUnsub);
  onDestroy(userUnsub);
</script>

<div class="container is-max-desktop">
  <Feed />
</div>
