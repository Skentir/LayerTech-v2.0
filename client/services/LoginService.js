import axios from 'axios';

export default {
  async login(credentials) {
    const res = await axios.post('/api/users/login/', credentials);
    // store JWT to localstorage
    localStorage.setItem('auth-token', JSON.stringify(res.headers['auth-token']));
  },
};
