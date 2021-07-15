import { combineReducers } from 'redux';

import isAuth, { IAuthReducer } from './isAuthReducers';

export default combineReducers({
    isAuth,
})

export interface IState {
    isAuth: IAuthReducer,
}