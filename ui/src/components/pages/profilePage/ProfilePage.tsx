import { useState } from 'react';
import styled from 'styled-components';

import DetailsForm from '../../profileForms/DetialsForm';
import { FontSize } from '../../../styledHelpers/FontSize';
import Button from '../../common/Button';
import ImageForm from '../../profileForms/ImageForm';
import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { ILoggedInReducer } from '../../../reducers/loggedInUserReducers';
import { ICurrentUserDetailsReducers } from '../../../reducers/currentUserDetailsReducers';


const EditButtonBox = styled.span`
    width: auto;
    height: 50px;
    font-size: ${FontSize[24]};
`;


const ProfilePage = () => {

    const { userData, currentUserDetails } = useSelector<IState, ILoggedInReducer & ICurrentUserDetailsReducers>( state => ({
        ...state.userData,
        ...state.currentUserDetails
      }));

    const [isEditDetails, setIsEditDeatils] = useState<boolean>(false);
    const editDetailsHandler = () => {
        setIsEditDeatils(!isEditDetails);
    }
    return (
        <>
            {isEditDetails ? (
                <DetailsForm />
            ) : (
                <div>
                    Strona profilu - widok bez formularzy
                    <div>
                        <span>Witaj na swoim profilu, {currentUserDetails?.firstName}</span>
                    </div>
                    <EditButtonBox>
                        <Button variant="primary" type="text" size="md" text="Edytuj szczegóły" onClick={editDetailsHandler}></Button>
                    </EditButtonBox>
                    <ImageForm/>
                </div>

            )}
        </>

    );
};

export default ProfilePage;