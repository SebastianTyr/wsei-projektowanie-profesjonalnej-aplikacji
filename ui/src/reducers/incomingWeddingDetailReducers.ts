import { IIncomingWeddingDetails } from "../entities/incomingWeddingDetails";
import * as actionTypes from '../actions/actionTypes/incomingWeddingDetailsTypes';

export interface IIncomingWeddingDetailsReducers {
    incomingWeddingDetails: IIncomingWeddingDetails;
}

const defaultState = (): IIncomingWeddingDetailsReducers => ({
    incomingWeddingDetails: {
        id: '',
        firstName:'',
        description:'',
        date: new Date().toLocaleDateString(),
        addressStreet: '',
        addressCity: '',
        addressPostCode: '',
        addressCountry: '',
        genders: 0,
    }
    });

export default (state = defaultState(), action: any) => {
    switch (action.type) {
        case actionTypes.GET_WEDDINGS: {
            const data: actionTypes.IIncomingWeddingDetailTypes['GET_WEDDINGS'] = action;
            return {
                ...state,
                incomingWeddingDetails: data.incomingWeddingDetails
            }
        }

        default: {
            return state;
        }
    }
}