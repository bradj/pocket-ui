<script>
  import FeedItem from '$components/FeedItem.svelte';
  import { onDestroy } from 'svelte';
  import { currentFeed} from '$store';

  let feed;

  const unsubFeed = currentFeed.subscribe(value => {
    feed = value;
  });

  onDestroy(unsubFeed);
</script>

{#each feed as item}
<FeedItem feedItem="{item}" />
{/each}
