import { Dispatch } from "redux";
import * as actionTypes from '../actions/actionTypes/incomingWeddingDetailsTypes';
import { IIncomingWeddingDetails } from "../entities/incomingWeddingDetails";


export const getIncomingWeddingDetails = (): Promise<IIncomingWeddingDetails> => ((dispatch: Dispatch) => {
    const urlGetIncomingWeddingDetails = 'https://localhost:5001/Users/GetIncomingWeddings';
    
    return fetch( urlGetIncomingWeddingDetails, {
        method: "GET",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
      })
      .then(response => response.json())
      .then((incomingWeddingDetails: IIncomingWeddingDetails) => {
          dispatch({
              type: actionTypes.GET_WEDDINGS,
              incomingWeddingDetails
          })
      })
    
}) as any;