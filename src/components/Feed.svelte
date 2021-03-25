<script>
  import FeedItem from '$components/FeedItem.svelte';
  import { getUserFeed, getInstanceFeed } from '$api';
  import { currentFeed,selectedUsername } from '$store';
  import { onMount, onDestroy, beforeUpdate } from 'svelte';

  export let username

  const unsubscribe = selectedUsername.subscribe(async (value) => {
		username = value;

    if (username) {
        await getUserFeed(username);
      } else {
        await getInstanceFeed();
      }
	});
  onDestroy(unsubscribe);
</script>

{#each $currentFeed as item}
<FeedItem feedItem="{item}" />
{/each}
