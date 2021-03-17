<script>
	import Nav from '$components/Nav.svelte';
import routes from '$root/routes';
import Router from 'svelte-spa-router';

</script>

<Nav />
<section class="section">
  <Router {routes} />
</section>

<style>
</style>
