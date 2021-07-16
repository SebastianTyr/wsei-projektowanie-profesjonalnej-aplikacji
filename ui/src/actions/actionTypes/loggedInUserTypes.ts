import { ILoggedInUser } from "../../entities/loggedInUser";

export const PUSH_DATA = 'PUSH_DATA';

export interface ILoggedInTypes {
    PUSH_DATA: {
        userData: ILoggedInUser;
    }
}