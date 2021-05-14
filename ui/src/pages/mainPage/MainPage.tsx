import { FC } from 'react';
import styled from 'styled-components';
import LeftBar from './LeftBar';
import MainContent from './MainContent';

import TopBar from './TopBar';


const Wrapper = styled.div`
    /* background-color: yellow; */
    min-height: 100vh;
    display: flex;
    flex-direction: column;

`;
const ContentWrapper = styled.div`
    border: 2px solid pink;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`;

const MainPage: FC = () => {
    return (
        <Wrapper>
            <TopBar></TopBar>
            <ContentWrapper>
                <LeftBar></LeftBar>
                <MainContent></MainContent>
            </ContentWrapper>

        </Wrapper>

    );

}

export default MainPage;