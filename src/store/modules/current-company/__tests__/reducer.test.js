import currentCompanyReducer from 'store/modules/current-company/reducer';
import { updateCompany } from 'store/modules/current-company/actions';

describe('Current company reducer', () => {
  describe('when the action is not relevant for the reducer', () => {
    it('returns unmodified state', () => {
      const state = { id: 30 };
      const action = { type: 'NOT_RELEVANT_ACTION', payload: { id: 40 } };
      const expectedState = { id: 30 };
      const returnedState = currentCompanyReducer(state, action);

      expect(returnedState).toStrictEqual(expectedState);
    });
  });

  describe('when the action type is relevant for the reducer', () => {
    describe('when the action is SET_CURRENT_COMPANY', () => {
      it("handles 'SET_CURRENT_COMPANY' ", () => {
        const initialState = { id: 10 };
        const newState = { id: 20 };
        const expectedState = { id: 20 };
        const action = updateCompany(newState);
        const updatedState = currentCompanyReducer(initialState, action);

        expect(updatedState).toStrictEqual(expectedState);
      });
    });
    describe("when the action type is 'persist/REHYDRATE'", () => {
      it("handles 'persist/REHYDRATE' ", () => {
        const initialState = { id: 0 };
        const newState = { id: 10 };
        const expectedState = { id: 10 };
        const action = {type: 'persist/REHYDRATE', payload: { user: { companies: [{ company : newState }] } }};
        const returnedState = currentCompanyReducer(initialState, action);

        expect(returnedState).toStrictEqual(expectedState);
      })
    });

    describe("when the action type is 'USER_SIGN_IN'", () => {
      it("handles 'USER_SIGN_IN' ", () => {
        const initialState = { id: 0 };
        const newState = { id: 10 };
        const expectedState = { id: 10 };
        const action = {type: '@user/SIGN_IN', payload: {companies: [{ company : newState }]} };
        const returnedState = currentCompanyReducer(initialState, action);

        expect(returnedState).toStrictEqual(expectedState);
      })
    });
  })
});
