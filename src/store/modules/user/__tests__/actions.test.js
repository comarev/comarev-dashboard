import { loginUser, logoutUser } from 'store/modules/user/actions';
import { createUser } from 'test/mocks/user';

describe('User actions', () => {
  it('#loginUser', () => {
    expect(loginUser({ ...createUser(), userToken: 'random-token' })).toStrictEqual(
      {
        payload: { ...createUser(), userToken: 'random-token' },
        type: '@user/SIGN_IN',
      }
    );
  });

  it('#logoutUser', () => {
    expect(logoutUser()).toStrictEqual({ type: '@user/SIGN_OUT' });
  });
});
