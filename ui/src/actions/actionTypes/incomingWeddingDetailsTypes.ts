import { IIncomingWeddingDetails } from '../../entities/incomingWeddingDetails';

export const GET_DETAILS = 'GET_DETAILS';

export interface IIncomingWeddingDetailTypes {
    GET_DETAILS: {
        incomingWeddingDetails: IIncomingWeddingDetails
    }
}