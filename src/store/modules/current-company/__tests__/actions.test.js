import { updateCompany } from 'store/modules/current-company/actions';

describe('Current company actions', () => {
  it('#updateCompany', () => {
    const mockPayload = { id: 1 };
    const expectedResult = {
      payload: { id: 1 },
      type: 'currentCompany/SET_CURRENT_COMPANY',
    };
    const returnedValue = updateCompany(mockPayload);

    expect(returnedValue).toStrictEqual(expectedResult);
  });
});
