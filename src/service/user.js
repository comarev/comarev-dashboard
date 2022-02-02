import service from '../service/api';

export const getUsers = async () => {
  return await service.get('/users');
};

export const registerUser = async (user) => {
  return await service.post('/users', { user: user });
};
