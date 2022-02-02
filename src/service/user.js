import service from '../service/api';

const getUsers = async () => {
  return await service.get('/users');
};

const registerUser = async (user) => {
  return await service.post('/users', { user: user });
};

const getUser = async (id) => {
  return await service.get(`/users/${id}`);
};

const updateUser = async (user) => {
  return await service.patch(`/users/${user.id}`, {
    user,
  });
};

export { getUsers, registerUser, getUser, updateUser };
