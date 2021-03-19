<script>
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
<div class="columns">
  <div class="column is-three-quarters">
    <img src="{`http://localhost:8080/api${item.location}`}" alt="">
    <p>Caption: {item.caption}</p>
    <p>Date: {item.created_at}</p>
  </div>
  <div class="column">
    Second column
  </div>
</div>
{/each}
