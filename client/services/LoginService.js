import axios from 'axios';

export default {
  async login() {
    const res = await axios.get('http://localhost:3000/login');
    return res.data;
  },
};
