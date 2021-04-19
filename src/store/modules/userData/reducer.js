const userData = (state = {}, action) => {
  switch (action.type) {
    case '@user/SIGN_IN':
      return action.data;
    case '@user/SIGN_OUT':
      return {};
    default:
      return state;
  }
};

export default userData;
