import currentCompanyReducer, {INITIAL_STATE} from 'store/modules/current-company/reducer';
import {updateCompany} from 'store/modules/current-company/actions'

describe('Current company reducer', () => {
  it('returns unmodified state', () => {
    expect(currentCompanyReducer(undefined, {})).toStrictEqual({ id: 0 })
  })

  it('handles SET_CURRENT_COMPANY', () => {
    expect(
      currentCompanyReducer(
        INITIAL_STATE,
        updateCompany({ id: 1 })
      )
    ).toStrictEqual({ id: 1 })
  })
})
