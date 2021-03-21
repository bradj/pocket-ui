import { currentFeed, loggedIn, user } from '$store';
import { push } from 'svelte-spa-router';

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

export const getUserFeed = async (username) => {
  try {
    const res = await fetch(getUrl(`/u/${username}`), {
      method: 'GET'
    });

    if (!res.ok) {
      console.log('Get Feed error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    currentFeed.set(body);
  } catch (error) {
    console.log(error);
  }
}

export const getInstanceFeed = async () => {
  try {
    const res = await fetch(getUrl(`/p/`), {
      method: 'GET'
    });

    if (!res.ok) {
      console.log('Instance Feed error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    currentFeed.set(body);
  } catch (error) {
    console.log(error);
  }
}

export const activeSession = async () => {
  try {
    const res = await fetch(getUrl(`/u`), {
      method: 'GET'
    });

    if (!res.ok) {
      console.log('Active Session error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    loggedIn.set(true);
    user.set({ ...body })
  } catch (error) {
    loggedIn.set(false);
    user.set(null);
  }
}

export const createPost = async (username, file, caption) => {
  try {
    const formData = new FormData();

    formData.append('caption', caption);
    formData.append('image', file);

    const res = await fetch(getUrl(`/u/${username}`), {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      console.log('Upload error', res.status, res.statusText);
      return false;
    }
  } catch (error) {
    console.log('Upload error', error);
    return false;
  }

  return true;
}
