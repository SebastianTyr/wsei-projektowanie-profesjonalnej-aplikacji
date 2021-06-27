import { FC } from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    border: 2px solid green;
    height: 70px;
    width: 100%;
    padding: 0.5rem;
`;

const TopBar: FC = () => {
    return (
        <Wrapper>Top bar</Wrapper>
    );
}

export default TopBar;