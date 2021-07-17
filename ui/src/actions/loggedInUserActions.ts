import { Dispatch } from 'redux';
import * as actionTypes from '../actions/actionTypes/loggedInUserTypes';
import { ILoggedInUser } from '../entities/loggedInUser';

export const getCurrentUserInfo = (userData: ILoggedInUser): Promise<ILoggedInUser> => ((dispatch: Dispatch) => {

    dispatch({
        type: actionTypes.PUSH_DATA,
        userData
    })
}) as any;