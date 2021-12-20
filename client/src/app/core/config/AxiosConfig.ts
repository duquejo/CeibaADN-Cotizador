import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE,
  timeout: 30000,
  // headers: { 'X-Custom-Header': 'foobar' },
});
