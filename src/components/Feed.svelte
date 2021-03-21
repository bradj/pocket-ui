<script>
  import FeedItem from '$components/FeedItem.svelte';
  import { getUserFeed, getInstanceFeed } from '$api';
  import { currentFeed,user } from '$store';
  import { onMount } from 'svelte';

  export let username;
  
  onMount(async () => {
    if (!$user) {
      return;
    }

    if (username) {
      await getUserFeed(username);
    } else {
      await getInstanceFeed();
    }
  });
</script>

{#each $currentFeed as item}
<FeedItem feedItem="{item}" />
{/each}
