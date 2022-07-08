import {actionTypes} from 'store/modules/current-company/types';

export const updateCompany = ({id}) => {
  return {
    type: actionTypes.SET_CURRENT_COMPANY,
    payload:{
      id,
    }
  };
};
