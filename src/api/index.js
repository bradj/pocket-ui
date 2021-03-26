import { activeAccount, loggedIn } from '$store';
import { push } from 'svelte-spa-router';

const baseURL = 'http://localhost:8080/api';

const getUrl = (url) => `${baseURL}${url}`;

const resetUserStore = () => {
  activeAccount.set(null);
  loggedIn.set(false);
}

const handleStatusCodes = (res) => {
  if (res.status === 401) {
    resetUserStore();
    push('/login');
  }
}

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
      handleStatusCodes(res);
      console.log('Login error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    activeAccount.set({ ...body.account });
    loggedIn.set(true);
  } catch (error) {
    console.log(error);
    activeAccount.set(null);
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

  resetUserStore();
  push('/login');
};

export const getAccountFeed = async (username) => {
  try {
    const res = await fetch(getUrl(`/u/${username}`), {
      method: 'GET'
    });

    if (!res.ok) {
      handleStatusCodes(res);
      console.log('Get Feed error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    return body;
  } catch (error) {
    console.log(error);
  }

  return null;
}

export const getInstanceFeed = async () => {
  try {
    const res = await fetch(getUrl(`/p/`), {
      method: 'GET'
    });

    if (!res.ok) {
      handleStatusCodes(res);
      console.log('Instance Feed error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    return body;
  } catch (error) {
    console.log(error);
  }

  return null;
}

export const activeSession = async () => {
  try {
    const res = await fetch(getUrl(`/u`), {
      method: 'GET'
    });

    if (!res.ok) {
      handleStatusCodes(res);
      console.log('Active Session error', res.status, res.statusText);
      return;
    }

    const body = await res.json();

    loggedIn.set(true);
    activeAccount.set({ ...body })
  } catch (error) {
    loggedIn.set(false);
    activeAccount.set(null);
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
      handleStatusCodes(res);
      console.log('Upload error', res.status, res.statusText);
      return false;
    }
  } catch (error) {
    console.log('Upload error', error);
    return false;
  }

  return true;
}

export const updateProfile = async (username, tagline, email, avatar) => {
  try {
    const res = await fetch(getUrl(`/u/${username}/profile`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, tagline, email, avatar })
    });

    if (!res.ok) {
      handleStatusCodes(res);
      console.log('Upload error', res.status, res.statusText);
      return false;
    }
  } catch (error) {
    console.log('Profile update error', error);
    return false;
  }

  return true;
}
