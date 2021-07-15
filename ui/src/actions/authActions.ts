import { Dispatch } from "redux";
import * as actionTypes from '../actions/actionTypes/authTypes';


export const getIsAuthInfo = ( isAuth: boolean): Promise<boolean> =>((dispatch: Dispatch) => {

    dispatch({
        type: actionTypes.PUSH_AUTH,
        isAuth
    })
}) as any;