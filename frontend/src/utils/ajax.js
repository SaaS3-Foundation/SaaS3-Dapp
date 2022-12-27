import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});
axios.interceptors.request.use((config) => {
  const __userSign = localStorage.getItem('__userSign');
  if (__userSign) {
    config.headers.__nonce = localStorage.getItem('__nonce');
    config.headers['__user-sign'] = __userSign;
    config.headers.__address = localStorage.getItem('__address');
  }

  return config;
});
axios.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err),
);

export default axios;
