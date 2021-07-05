import styled from 'styled-components';
import { FontSize } from '../../../styledHelpers/FontSize';


const EditButtonBox = styled.span`
    width: auto;
    height: 50px;
    font-size: ${FontSize[24]};
`;




const ProfilePage = () => {

    return(
        <>
        Strona profilu - widok bez formularza
        <EditButtonBox>
            <button>Edit</button>
        </EditButtonBox>
        </>

    );
};

export default ProfilePage;