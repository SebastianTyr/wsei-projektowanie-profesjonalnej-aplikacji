import { IIncomingWeddingDetails } from "../entities/incomingWeddingDetails";
import * as actionTypes from '../actions/actionTypes/incomingWeddingDetailsTypes';

export interface IIncomingWeddingDetailsReducers {
    incomingWeddingDetails: IIncomingWeddingDetails;
}
/*
const defaultState = (): IIncomingWeddingDetailsReducers => ({
    incomingWeddingDetails: {
        date: new Date(),
        address: {
            city: '',
            country: '',
            postCode: '',
            street: ''
        },
        description:''
    }
    });

export default (state = defaultState(), action: any) => {
    switch (action.type) {
        case actionTypes.GET_DETAILS: {
            const data: actionTypes.IncomingWeddingDetailsTypes['GET_DETAILS'] = action;
            return {
                ...state,
                incomingWeddingDetails: data.currentUserDetails
            }
        }

        default: {
            return state;
        }
    }
}*/