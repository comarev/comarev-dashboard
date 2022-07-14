import userReducer, { INITIAL_STATE } from 'store/modules/user/reducer';
import { loginUser, logoutUser, updateUserCompany } from 'store/modules/user/actions';
import { createUser } from 'test/mocks/user';

describe('User reducer', () => {
  it('returns INITIAL_STATE', () => {
    expect(userReducer(undefined, {})).toStrictEqual(INITIAL_STATE);
  });

  it('handles USER_SIGN_IN', () => {
    expect(
      userReducer(
        undefined,
        loginUser({ ...createUser('customer'), userToken: 'random-token' })
      )
    ).toStrictEqual({
      ...createUser('customer'),
      logged: true,
      userToken: 'random-token',
    });
  });

  it('handles USER_SIGN_OUT', () => {
    expect(userReducer(undefined, logoutUser())).toStrictEqual({
      ...INITIAL_STATE,
      logged: false,
    });
  });

  it('handles USER_UPDATE_COMPANY', () => {
    const newCompany = {id: 1, name: 'only a test company'};
    const action = updateUserCompany(newCompany)
    const initialState = {companies: [{company: {id: 1, name:'test company 1'}, role: 'manager'}, 
    {company: {id: 2, name:'test company 2'}, role:'manager'}]};

    const expectedState = {companies: [{ company: {id: 2, name:'test company 2'}, role: 'manager'}, 
    {role: 'manager', company: {id: 1,  name:'only a test company'} } ]}
    const returnedState = userReducer(initialState, action);
    
    expect(returnedState).toEqual(expectedState);
  })
});
