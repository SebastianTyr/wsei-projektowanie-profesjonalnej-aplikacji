import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';


const Wrapper = styled.div`
    border: 2px solid green;
    height: 70px;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
`;

const LogoBox = styled.span`
    display: block;
`;

const RightButtonsBox = styled.div`
    display: flex;
`;

const SingleElementBox = styled.span`
    border: 1px solid ${Colors.redMain};
    display: block;
    margin-left: ${Margin[16]};
    font-size: ${FontSize[16]};
`;


const TopBar: FC = () => {
    return (
        <Wrapper>
            <Link to="/" >
                <LogoBox>Logo</LogoBox>
            </Link>
            <RightButtonsBox>
                <SingleElementBox>Wiadomości</SingleElementBox>
                <SingleElementBox>Nazwa Użtykownika</SingleElementBox>
                <Link to="/profile" >
                    <SingleElementBox>Zobacz profil</SingleElementBox>
                </Link>
            </RightButtonsBox>
        </Wrapper>
    );
}

export default TopBar;