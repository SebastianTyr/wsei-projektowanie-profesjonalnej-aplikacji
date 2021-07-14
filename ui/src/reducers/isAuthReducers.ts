import * as actionTypes from '../actions/actionTypes/authTypes';

export interface IAuthReducer {
    isAuth: boolean;
};

const defaultState = (): IAuthReducer => ({
    isAuth: false,
});

export default (state = defaultState(), action: any) => {
    switch(action.type) {
        case actionTypes.PUSH_AUTH: {
            const data: actionTypes.IAuthTypes['PUSH_AUTH'] = action;
            return {
                ...state,
                isAuth: data.isAuth
            }
        }
        default: {
            return state;
        }
    }
}