<script>
  import { user } from '$store';
  import { onMount } from 'svelte';

  /**
   * Incoming Feed Item
   * @typedef {Object} FeedItem
   * @type {object}
   * @property {string} location - Media URL
   * @property {string?} caption - Post caption
   * @property {string} id - Post ID
   * @property {Date} created_at - Post creation date
   * @property {string} name - Page/User name
   */

  /**
   * @type {FeedItem}
  */
  export let feedItem;
  
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };
</script>

<style>
  #feed-item-columns {
    border: 1px solid #d3d3d3;
  }
</style>

<div class="columns has-background-white mb-5 p-3 is-clearfix" id="feed-item-columns">
  <div class="column is-three-quarters">
    <figure class="image">
      <img src="{`http://localhost:8080/api${feedItem.location}`}" style="max-height: 620px;" alt="" height="620px">
    </figure>
    <div class="columns">
      <div class="column is-half">
        <p>{feedItem.name}</p>
      </div>
      <div class="column is-half has-text-right">
        {formatDate(feedItem.created_at)}
      </div>
    </div>
    <p>{feedItem.caption}</p>
  </div>
  <div class="column">
  </div>
</div>
