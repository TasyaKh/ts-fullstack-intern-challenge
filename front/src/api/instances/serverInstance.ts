import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER || 'http://localhost:3000/api';

export const serverInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});