import axios from 'axios';

const baseURL = 'https://api.thecatapi.com/v1';

export const catInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});