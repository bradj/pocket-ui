/* eslint-disable */

// Import the wrap method
// Components: only Home, Loading and NotFound are statically included in the bundle
import Home from './routes/Home.svelte';
import Login from './routes/Login.svelte';
import NotFound from './routes/NotFound.svelte';
import Upload from './routes/Upload.svelte';
import User from './routes/User.svelte';

// Export the route definition object
export default {
  // Exact path
  '/': Home,
  '/u/:username': User,
  '/login': Login,
  '/upload': Upload,

  // Catch-all, must be last
  '*': NotFound,
}
