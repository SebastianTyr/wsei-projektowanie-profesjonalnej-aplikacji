import { IIncomingWeddingDetails } from '../../entities/incomingWeddingDetails';

export const GET_WEDDINGS = 'GET_WEDDINGS';

export interface IIncomingWeddingDetailTypes {
    GET_WEDDINGS: {
        incomingWeddingDetails: IIncomingWeddingDetails
    }
}