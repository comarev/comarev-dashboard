import { actionTypes } from "store/modules/current-company/types";
import { USER_SIGN_IN } from "../user/types";

export const INITIAL_STATE = {
  id: 0,
}

export const fetchCurrentCompany = (userCompanies, e) => {
  if ( e.target.value !== '') return userCompanies.find((c) => c.id === e.target.value);
}

const hasCompanies = (companies) => {
  return companies.length > 0
}
const currentCompanyReducer = (state = INITIAL_STATE , action) => {
  const { SET_CURRENT_COMPANY } = actionTypes;
  switch (action.type) {
    case SET_CURRENT_COMPANY:{
      const {id} = action.payload
      return { ...state, id};
}
    case 'persist/REHYDRATE' : {
      if ( hasCompanies(action.payload.user.companies) ){
        const { id } = action.payload.user.companies[0].company;
        return { ...state, id};
      }
    }
    case USER_SIGN_IN :{
      if ( hasCompanies(action.payload.companies) ){
        const { id } = action.payload.companies[0].company;
        return { ...state, id};
      }
    }

    default:
      return state;
  }
}

export default currentCompanyReducer
