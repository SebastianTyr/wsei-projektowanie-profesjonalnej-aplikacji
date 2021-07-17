import { combineReducers } from 'redux';

import userData, { ILoggedInReducer} from './loggedInUserReducers';

export default combineReducers({
    userData,
})

export interface IState {
    userData: ILoggedInReducer
}