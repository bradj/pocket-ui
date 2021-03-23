import { writable } from 'svelte/store';

/**
 * User
 * @typedef {Object} User
 * @type {object}
 * @property {string} username - username
 * @property {string} email - email
 * @property {string} id - Account ID
 * @property {Date} created_at - Post creation date
 * @property {Date} updated_at - Post creation date
 * @property {boolean} is_disabled - Is this account disabled
 */

/**
 * @type {User}
 */
export const user = writable(null);
/**
 * @type {boolean}
 */
export const loggedIn = writable(false);
export const currentFeed = writable([]);
export const selectedUsername = writable(null);
