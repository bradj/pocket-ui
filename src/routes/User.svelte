<script>
  import Feed from '$components/Feed.svelte';
  import SmallProfile from '$components/SmallProfile.svelte';
  import { beforeUpdate } from 'svelte';
  import { getAccountFeed } from '$api';
  import { currentFeed, selectedAccount } from '$store';

  export let params = {};
  
  beforeUpdate(async () => {
    window.scrollTo(0, 0);
    const {account, posts} = await getAccountFeed(params.username);

    currentFeed.set(posts);
    selectedAccount.set(account);
  });
</script>

<svelte:head>
	<title>Pocket - {params.username}</title>
</svelte:head>

<div class="container is-max-desktop">
  <SmallProfile />
  <Feed username={params.username}/>
</div>
