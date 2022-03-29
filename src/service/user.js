import service from 'service/api';
import { onlyNumbers } from 'utils/parsers/general';

const parseUser = (user) => ({
  ...user,
  cellphone: onlyNumbers(user.cellphone),
  cpf: onlyNumbers(user.cpf),
});

const getUsers = async () => {
  return await service.get('/users');
};

const registerUser = async (user) => {
  return await service.post('/users', { user: parseUser(user) });
};

const getUser = async (id) => {
  return await service.get(`/users/${id}`);
};

const updateUser = async (user) => {
  return await service.patch(`/users/${user.id}`, {
    user: parseUser(user),
  });
};

export { getUsers, registerUser, getUser, updateUser };
