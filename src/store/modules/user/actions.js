import { USER_SIGN_IN, USER_SIGN_OUT } from './types';

export const logoutUser = () => ({ type: USER_SIGN_OUT });
export const loginUser = ({
  id,
  full_name,
  email,
  cpf,
  address,
  cellphone,
  picture_url,
  admin,
  active,
  created_at,
  updated_at,
  userToken,
}) => ({
  type: USER_SIGN_IN,
  payload: {
    id,
    full_name,
    email,
    cpf,
    address,
    cellphone,
    picture_url,
    admin,
    active,
    created_at,
    updated_at,
    userToken,
  },
});
