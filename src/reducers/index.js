import { combineReducers } from 'redux';

import company from './company';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    company,
    auth,
    profile
});
