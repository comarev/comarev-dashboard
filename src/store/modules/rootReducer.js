import { combineReducers } from 'redux';
import user from './user/reducer';
import currentCompany from './current-company/reducer';

export default combineReducers({ user, currentCompany });
