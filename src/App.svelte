<script>
	import Nav from '$components/Nav.svelte';
import routes from '$root/routes';
import Router from 'svelte-spa-router';

</script>

<Nav />
<section class="section">
  <Router {routes} />
</section>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Pocket</strong> by <a href="bradjanke.com">Brad Janke</a>.
    </p>
  </div>
</footer>

<style>
</style>
