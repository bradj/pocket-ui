import { writable } from 'svelte/store';

export const user = writable(null);
export const loggedIn = writable(false);
export const currentFeed = writable([]);
export const myFeed = writable([]);
