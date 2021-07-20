import { Dispatch } from "redux";
import * as actionTypes from '../actions/actionTypes/currentUserDetailsTypes';
import { ICurrentUserDetails } from "../entities/currentUserDetails";


export const getCurrentUserDetails = (): Promise<ICurrentUserDetails> => ((dispatch: Dispatch) => {
    const urlGetCurrentUserDetails = 'https://localhost:5001/Users/GetCurrentUserInfo';
    
    return fetch( urlGetCurrentUserDetails, {
        method: "GET",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
      })
      .then(response => response.json())
      .then((currentUserDetails: ICurrentUserDetails) => {
          dispatch({
              type: actionTypes.GET_DETAILS,
              currentUserDetails
          })
      })
    
}) as any;