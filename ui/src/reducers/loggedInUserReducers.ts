import * as actionTypes from '../actions/actionTypes/loggedInUserTypes';
import { ILoggedInUser } from "../entities/loggedInUser";

export interface ILoggedInReducer {
    userData: ILoggedInUser;
};

const defaultState = (): ILoggedInReducer => ({
    userData: {
        email: '',
        firstName: '',
        id: '',
        secondName: '',
        userName: ''
    }
});

export default (state = defaultState(), action: any) => {
    switch(action.type) {
        case actionTypes.PUSH_DATA: {
            const data: actionTypes.ILoggedInTypes['PUSH_DATA'] = action;
            return {
                ...state,
                userData: data.userData
            }
        }
        default: {
            return state;
        }
    }
}