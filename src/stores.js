import { writable } from 'svelte/store';

/**
 * Account
 * @typedef {Object} Account
 * @type {object}
 * @property {string} username - username
 * @property {string} email - email
 * @property {string} id - Account ID
 * @property {string} avatar_location - URL to user avatar
 * @property {Date} created_at - Post creation date
 * @property {Date} updated_at - Post creation date
 * @property {boolean} is_disabled - Is this account disabled
 */

/**
 * @type {Account}
 */
export const activeAccount = writable(null);
/**
 * @type {boolean}
 */
export const loggedIn = writable(false);
export const currentFeed = writable([]);
/**
 * @type {Account}
 */
export const selectedAccount = writable(null);
