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

  describe('when the action is relevant for the reducer', () => {
    it('returns the updated state', () => {
      const initialState = { id: 10 };
      const newState = { id: 20 };
      const expectedState = { id: 20 };
      const action = updateCompany(newState);
      const updatedState = currentCompanyReducer(initialState, action);

      expect(updatedState).toStrictEqual(expectedState);
    });
  });
});
