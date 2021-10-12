import { USER_SIGN_IN, USER_SIGN_OUT } from './types';

export const INITIAL_STATE = {
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
  userToken: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...action.payload,
        logged: true,
        userToken: action.payload.userToken,
      };
    case USER_SIGN_OUT:
      return { ...INITIAL_STATE, logged: false };
    case 'persist/REHYDRATE':
      return {
        ...action.payload.user,
        logged: true,
        userToken: action.payload.userToken,
      };
    default:
      return state;
  }
};

export default userReducer;
