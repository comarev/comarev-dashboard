const currentUser = (state = {}, action) => {
  switch (action.type) {
    case '@currentUser/SIGN_IN':
      return action.data;
    case '@currentUser/SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default currentUser;
