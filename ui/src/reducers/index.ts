import { combineReducers } from 'redux';

import userData, { ILoggedInReducer} from './loggedInUserReducers';
import currentUserDetails, { ICurrentUserDetailsReducers }  from './currentUserDetailsReducers';
import incomingWeddingDetails, { IIncomingWeddingDetailsReducers } from './incomingWeddingDetailReducers';

export default combineReducers({
    userData,
    currentUserDetails,
    incomingWeddingDetails
})

export interface IState {
    userData: ILoggedInReducer,
    currentUserDetails: ICurrentUserDetailsReducers
    incomingWeddingDetails: IIncomingWeddingDetailsReducers
}