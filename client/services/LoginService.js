import axios from 'axios';

const url = process.env.VUE_APP_API_URL;

export default {
  async login(credentials) {
    console.log(`${url}/employees/login/`);
    const res = await axios.post(`${url}/employees/login/`, credentials);
    // store JWT to localstorage
    localStorage.setItem('auth-token', JSON.stringify(res.data['auth-token']));
    // store role to localstorage
    localStorage.setItem('role', JSON.stringify(res.data.role).toLowerCase());
  },
};
