import { currentFeed, loggedIn, user } from '$store';
import axios from 'axios';
import { push } from 'svelte-spa-router';

const instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

export const login = async (username, password) => {
  try {
    const res = await instance.post('/auth/login', {
      username, password
    });

    user.set({...res.data.user});
    loggedIn.set(true);
    
    instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
  } catch (error) {
    console.log(error);
  }
}

export const logout = async () => {
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
