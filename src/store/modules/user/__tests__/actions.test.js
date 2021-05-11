import { loginUser, logoutUser } from '../actions';
import { userData } from '../../../../test/mocks/user';

describe('User actions', () => {
  it('#loginUser', () => {
    expect(loginUser(userData)).toStrictEqual({
      payload: { ...userData },
      type: '@user/SIGN_IN',
    });
  });

  it('#logoutUser', () => {
    expect(logoutUser()).toStrictEqual({ type: '@user/SIGN_OUT' });
  });
});
