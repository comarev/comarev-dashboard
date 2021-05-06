import { USER_SIGN_IN, USER_SIGN_OUT } from './actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return action.data;
    case USER_SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default user;
