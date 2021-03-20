<script>
	import { activeSession } from '$api';
import Nav from '$components/Nav.svelte';
import routes from '$root/routes';
import { beforeUpdate } from 'svelte';
import Router from 'svelte-spa-router';

	beforeUpdate(async () => {
		await activeSession();
	});
</script>

<Nav />
<section class="section mt-6">
  <Router {routes} />
</section>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Pocket</strong> by <a href="bradjanke.com">Brad Janke</a>.
    </p>
  </div>
</footer>
