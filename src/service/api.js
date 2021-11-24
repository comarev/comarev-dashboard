import axios from 'axios';

const getToken = () => {
  const storagedUser = localStorage.getItem('user');

  if (!storagedUser) return '';

  return JSON.parse(storagedUser)?.userToken;
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers['Authorization'] = token;

  return config;
});

export default instance;
