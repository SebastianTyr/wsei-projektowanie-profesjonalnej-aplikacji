import { combineReducers } from 'redux';

import userData, { ILoggedInReducer} from './loggedInUserReducers';
import currentUserDetails, { ICurrentUserDetailsReducers }  from './currentUserDetailsReducers';

export default combineReducers({
    userData,
    currentUserDetails
})

export interface IState {
    userData: ILoggedInReducer,
    currentUserDetails: ICurrentUserDetailsReducers
}