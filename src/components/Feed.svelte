<script>
  import { getFeed } from '$api';
import { currentFeed,user } from '$store';
import { onMount } from 'svelte';


  onMount(async () => {
    await getFeed($user.username);
  })
</script>

{#each $currentFeed as item}
<div class="columns">
  <div class="column is-three-quarters">
    <p>Location: {item.location}</p>
    <p>Caption: {item.caption}</p>
    <p>Date: {item.created_at}</p>
  </div>
  <div class="column">
    Second column
  </div>
</div>
{/each}
