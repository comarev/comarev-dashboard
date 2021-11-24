import { loginUser, logoutUser } from '../actions';
import { userData } from '../../../../test/mocks/user';

describe('User actions', () => {
  it('#loginUser', () => {
    expect(loginUser({ ...userData, userToken: 'random-token' })).toStrictEqual(
      {
        payload: { ...userData, userToken: 'random-token' },
        type: '@user/SIGN_IN',
      }
    );
  });

  it('#logoutUser', () => {
    expect(logoutUser()).toStrictEqual({ type: '@user/SIGN_OUT' });
  });
});
