import { updateCompany } from "store/modules/current-company/actions";

describe('Current company actions', () => {
  const mockPayload = {id: 1, name: 'Test'}
  it('#updateCompany', () => {
    expect(updateCompany(mockPayload)).toStrictEqual(
      {
        payload: {id: 1, name: "Test"},
        type: 'currentCompany/SET_CURRENT_COMPANY',
      }
    )
  })
})
