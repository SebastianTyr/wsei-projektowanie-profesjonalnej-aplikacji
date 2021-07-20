import { ICurrentUserDetails } from "../../entities/currentUserDetails";

export const GET_DETAILS = 'GET_DETAILS';

export interface ICurrentUserDetailsTypes {
    GET_DETAILS: {
        currentUserDetails: ICurrentUserDetails
    }
}