import axios from 'axios';
import App from './App.svelte';

axios.defaults.baseURL = 'http://localhost:3001/';

const app = new App({
	target: document.body,
	props: { }
});

export default app;
