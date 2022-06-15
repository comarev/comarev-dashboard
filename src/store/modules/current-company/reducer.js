import { actionTypes } from "store/modules/current-company/types";

export const INITIAL_STATE = {
  id: 0,
  name: "",
}

const currentCompanyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case actionTypes.SET_CURRENT_COMPANY:
      const {id, name} = action.payload
      return { ...state, id, name };

    default:
      return state;
  }
}

export default currentCompanyReducer
