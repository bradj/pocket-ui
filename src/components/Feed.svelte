<script>
  import FeedItem from '$components/FeedItem.svelte';
  import { getFeed } from '$api';
  import { currentFeed,user } from '$store';
  import { onMount } from 'svelte';
  
  onMount(async () => {
    if (!$user) {
      return;
    }
    
    await getFeed($user.username);
  })
</script>

{#each $currentFeed as item}
<FeedItem feedItem="{item}" />
{/each}
