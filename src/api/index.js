import axios from 'axios';

export const login = async (username, password) => {
  try {
    const res = await axios.post('/auth/login', {
      username, password
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
