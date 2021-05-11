import userReducer, { INITIAL_STATE } from '../reducer';
import { loginUser, logoutUser } from '../actions';
import { userData } from '../../../../test/mocks/user';

describe('User reducer', () => {
  it('returns INITIAL_STATE', () => {
    expect(userReducer(undefined, {})).toStrictEqual(INITIAL_STATE);
  });

  it('handles USER_SIGN_IN', () => {
    expect(userReducer(undefined, loginUser(userData))).toStrictEqual({
      ...userData,
      logged: true,
    });
  });

  it('handles USER_SIGN_OUT', () => {
    expect(userReducer(undefined, logoutUser())).toStrictEqual({
      ...INITIAL_STATE,
      logged: false,
    });
  });
});
