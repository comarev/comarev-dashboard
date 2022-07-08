import { USER_SIGN_IN, USER_SIGN_OUT, USER_UPDATE_COMPANY } from './types';

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
  manager,
  customer,
  logged,
  active,
  created_at,
  updated_at,
  userToken,
  companies,
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
    manager,
    customer,
    logged,
    active,
    created_at,
    updated_at,
    userToken,
    companies,
  },
});

export const updateUserCompany = ( company ) => {
  return {
    type: USER_UPDATE_COMPANY,
    payload: company
  }
}
