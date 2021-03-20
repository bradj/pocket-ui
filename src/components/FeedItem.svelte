<script>
  import { user } from '$store';

  export let feedItem;
</script>

<style>
  div.columns {
    border: 1px solid #d3d3d3;
  }
</style>

<div class="columns has-background-white mb-5 p-3 is-clearfix">
  <div class="column is-three-quarters">
    <figure class="image">
      <img src="{`http://localhost:8080/api${feedItem.location}`}" style="max-height: 620px;" alt="" height="620px">
    </figure>
    <p>Caption: {feedItem.caption}</p>
    <p>Date: {feedItem.created_at}</p>
  </div>
  <div class="column">
    Second column blah?
  </div>
</div>
