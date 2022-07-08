import { USER_SIGN_IN, USER_SIGN_OUT, USER_UPDATE_COMPANY } from './types';
export const INITIAL_STATE = {
  id: 0,
  full_name: '',
  email: '',
  cpf: '',
  address: '',
  cellphone: '',
  picture_url: null,
  admin: false,
  manager: false,
  customer: false,
  active: false,
  created_at: '',
  updated_at: '',
  logged: false,
  userToken: '',
};

const isManager = (user) =>
  user.companies.some((company) => company.role === 'manager');

const isCustomer = (user) => !user.admin && user.companies.length === 0;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGN_IN: {
      return {
        ...action.payload,
        manager: isManager(action.payload),
        customer: isCustomer(action.payload),
        logged: true,
        userToken: action.payload.userToken,
      };
    }
    case USER_SIGN_OUT:
      return { ...INITIAL_STATE, logged: false };
    case 'persist/REHYDRATE': {
      return {
        ...action.payload.user,
        manager: isManager(action.payload.user),
        customer: isCustomer(action.payload.user),
        logged: true,
        userToken: action.payload.userToken,
      };
    }
    case USER_UPDATE_COMPANY:{
      console.log(action.payload)
      const role = state.companies.find(company => company.company.id === action.payload.id).role;
      const companies = state.companies.filter(company => { 
        return company.company.id !== action.payload.id;
      })

      return { 
        ...state,
        companies : [ ...companies, { role, company: action.payload } ]
      

        
      }
    }
    
    default:
      return state;
  }
};

export default userReducer;
