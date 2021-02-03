import axios from 'axios';

const url = process.env.VUE_APP_API_URL;

export default {
  async login(credentials) {
    console.log(`${url}/users/login/`);
    const res = await axios.post(`${url}/users/login/`, credentials);
    // store JWT to localstorage
    localStorage.setItem('auth-token', JSON.stringify(res.data['auth-token']));
  },
};
