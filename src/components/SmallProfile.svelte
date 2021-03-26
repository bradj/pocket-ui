<script>
  import { selectedAccount, currentFeed } from '$store';
  import { onDestroy } from 'svelte';

  let feed, account;

  const unsubAccount = selectedAccount.subscribe(value => {
    account = value;
  });

  const unsubFeed = currentFeed.subscribe(value => {
    feed = value;
  });

  onDestroy(unsubAccount);
  onDestroy(unsubFeed);
</script>

<div class="card has-background-white mb-6">
  <div class="card-content">
    <div class="columns">
      <div class="column is-half">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img src="/woman.svg" alt="Woman">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{account?.username || ''}</p>
            <p class="subtitle is-6">{account?.username || ''}</p>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Posts</p>
              <p class="title">{feed.length}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Following</p>
              <p class="title">123</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</div>
