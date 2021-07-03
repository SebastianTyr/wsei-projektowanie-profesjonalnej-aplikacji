import { FC } from 'react';
import styled from 'styled-components';

import { Colors } from '../../../styledHelpers/Colors';


const Wrapper = styled.div`
   
    background-color: ${Colors.white};
    height: 300px;
    padding: 1rem 0;
    margin-right: 2rem;
    flex: 2;
    border-radius: 3%;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

const ImageBox = styled.span`
    height: 70px;
    width: 70px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

    };
`;

const NameBox = styled.span`
    font-weight: 700;
`;

const DescriptionBox = styled.span``;

const ProfilBox = styled.span``;

const ButtonBox = styled.span``;

const LeftBar: FC = () => {
    return (
        <Wrapper>
            <ImageBox>
                <img src='./photos/userAvatar_2.jpg' alt='user'></img>
            </ImageBox>
            <NameBox>Aniela Kowalska</NameBox>
            <DescriptionBox>Uśmiech to podstawa-takie tam hasło</DescriptionBox>
            <ProfilBox>Twój Profil</ProfilBox>
            <ButtonBox>Dodaj ogłoszenie</ButtonBox>
            <ButtonBox>Dodaj znajomego</ButtonBox>
        </Wrapper>

    );

}

export default LeftBar;