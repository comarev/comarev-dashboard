import { actionTypes } from "store/modules/current-company/types";

export const INITIAL_STATE = {
  id: 0,
}

export const fetchCurrentCompany = (listedCompanies, e) => {
  if ( e.target.value !== '') return listedCompanies.find((c) => c.id === e.target.value);
}

const currentCompanyReducer = (state = INITIAL_STATE , action) => {
  const { SET_CURRENT_COMPANY } = actionTypes;
  switch (action.type) {

    case SET_CURRENT_COMPANY:
      const {id} = action.payload
      return { ...state, id};

    default:
      return state;
  }
}

export default currentCompanyReducer
