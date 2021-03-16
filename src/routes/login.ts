import axios, { AxiosResponse } from 'axios';
import type { Request, Response } from 'express';

export async function post(req: Request, res: Response, next: () => void) {
  try {
    const response: AxiosResponse = await axios.post('/auth/login', {
      username: req.body.username,
      password: req.body.password
    });

    if (!response.data) {
      console.log('No data was present in the login response');
      return;
    }

    if (!response.data) {
      console.log('Response data is empty');
      res.end(JSON.stringify({error: 'Please try again'}));
    }

    req.session.user = response.data.user;
    res.end(JSON.stringify({ user: req.session.user }));
  } catch (error) {
    console.log('Login Error', error);
  }
}
