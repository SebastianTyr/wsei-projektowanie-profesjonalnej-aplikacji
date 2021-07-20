import { useState } from 'react';
import styled from 'styled-components';

import DetailsForm from '../../profileForms/DetialsForm';
import { FontSize } from '../../../styledHelpers/FontSize';
import Button from '../../common/Button';
import ImageForm from '../../profileForms/ImageForm';


const EditButtonBox = styled.span`
    width: auto;
    height: 50px;
    font-size: ${FontSize[24]};
`;


const ProfilePage = () => {
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