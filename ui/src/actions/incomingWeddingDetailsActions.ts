export{}
/*import { Dispatch } from "redux";
import * as actionTypes from '../actions/actionTypes/currentUserDetailsTypes';
import { IIncomingWeddingDetails } from "../entities/currentUserDetails";


export const getIncomingWeddingDetails = (): Promise<IIncomingWeddingDetails> => ((dispatch: Dispatch) => {
    const urlGetIncomingWeddingDetails = 'https://localhost:5001/Users/';
    
    return fetch( urlGetIncomingWeddingDetails, {
        method: "GET",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
      })
      .then(response => response.json())
      .then((IncomingWeddingDetails: IIncomingWeddingDetails) => {
          dispatch({
              type: actionTypes.GET_DETAILS,
              IncomingWeddingDetails
          })
      })
    
}) as any;*/