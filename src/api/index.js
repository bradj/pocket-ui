import { currentFeed, loggedIn, user } from '$store';
import axios from 'axios';
import { push } from 'svelte-spa-router';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/'
});

const baseURL = 'http://localhost:8080/api';

const getUrl = (url) => `${baseURL}${url}`;

export const login = async (username, password) => {
  try {
    const res = await fetch(getUrl('/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      console.log('Login error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    user.set({ ...body.user });
    loggedIn.set(true);
  } catch (error) {
    console.log(error);
    user.set(null);
    loggedIn.set(false);
  }
}

export const logout = async () => {
  const res = await fetch(getUrl('/auth/logout'), {
    method: 'POST'
  });

  if (!res.ok) {
    console.log('Logout error', res.status, res.statusText);
    return;
  }

  user.set(null);
  loggedIn.set(false);
  push('/login');
}

export const getFeed = async (username) => {
  try {
    const res = await instance.get(`/u/${username}`);
    currentFeed.set(res.data);
  } catch (error) {
    console.log(error);
  }
}

export const activeSession = async () => {
  try {
    const res = await instance.get(`/u`);

    loggedIn.set(true);
    user.set({ ...res.data })
  } catch (error) {
    loggedIn.set(false);
    user.set(null);
  }
}
