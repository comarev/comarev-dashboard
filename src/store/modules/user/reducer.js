import { USER_SIGN_IN, USER_SIGN_OUT } from './actions';

const INITIAL_STATE = {
  id: 0,
  full_name: '',
  email: '',
  cpf: '',
  address: '',
  cellphone: '',
  picture_url: null,
  admin: false,
  active: false,
  created_at: '',
  updated_at: '',
  logged: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return { ...action.data, logged: true };
    case USER_SIGN_OUT:
      return { ...action.data, logged: false };
    default:
      return state;
  }
};

export default user;
