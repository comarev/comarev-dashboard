import axios from 'axios';

const getToken = () => {
  const storagedUser = localStorage.getItem('user');

  if (!storagedUser) return '';

  return JSON.parse(storagedUser)?.userToken;
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.defaults.headers['Authorization'] = getToken();

export default instance;
