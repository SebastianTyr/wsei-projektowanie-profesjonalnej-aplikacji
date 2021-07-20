import { ICurrentUserDetails } from "../entities/currentUserDetails";
import * as actionTypes from '../actions/actionTypes/currentUserDetailsTypes';

export interface ICurrentUserDetailsReducers {
    currentUserDetails: ICurrentUserDetails;
}

const defaultState = (): ICurrentUserDetailsReducers => ({
    currentUserDetails: {
        addres: {
            city: '',
            country: '',
            postCode: '',
            street: ''
        },
        birthDate: new Date(),
        coordinate: {
            latitude: 0,
            longitude: 0
        },
        description: '',
        email: '',
        firstName: '',
        gender: 0,
        height: {
            unit: "cm",
            value: 0
        },
        id: '',
        isConfirmed: false,
        photos: [
            {
                photoNo: 0,
                photoUrl: ''
            }
        ],
        secondName: '',
        userName: '',
        wantedGender: 0,
        weight: {
            unit: 'kg',
            value: 0
        }
    }
});

export default (state = defaultState(), action: any) => {
    switch (action.type) {
        case actionTypes.GET_DETAILS: {
            const data: actionTypes.ICurrentUserDetailsTypes['GET_DETAILS'] = action;
            return {
                ...state,
                currentUserDetails: data.currentUserDetails
            }
        }

        default: {
            return state;
        }
    }
}