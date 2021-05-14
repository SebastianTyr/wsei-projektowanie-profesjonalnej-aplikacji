import { FC } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    border: 2px solid black;
    flex: 6;
`;

const MainContent: FC = () => {
    return (
        <Wrapper>Hello from MainContent</Wrapper>

    );

}

export default MainContent;