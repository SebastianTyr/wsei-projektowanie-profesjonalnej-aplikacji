import React from 'react';
import styled from 'styled-components';
import { Colors } from '../styledHelpers/Colors';

const Wrapper = styled.div`
    background-color: rgba(0,0,0,.4);
    min-height: 100vh;
    background-image: url("./media/images/landing-background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
`
const Header = styled.header`
    background: transparent;
    padding: 1rem;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
`
const LogoContainer = styled.div`
    display: block;
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
`
const Logo = styled.div`
    width: 70px;
    height: 70px;
    background-image: url("./media/icons/glass-cheers-solid.svg");
    background-repeat: no-repeat;
    font-size: 18px;
`
const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 60vh;
    padding: 1rem;
    color: white;
    height: calc(100vh - 82px);
    &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg,rgba(0,0,0,.6) 0,transparent 100vh);
    }
`
const ButtonContainer = styled.div`

`
const LogButton = styled.button`
    text-transform: uppercase;
    background: ${Colors.white};
    padding: 1rem 2rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
`
const CreateAccountButton = styled.button`
    text-transform: uppercase;
    background: ${Colors.white};
    padding: 1.25rem 4rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 2rem;
    z-index: 1;
`
const Section = styled.section`
    background: white;
    padding: 1rem;
    min-height: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Footer = styled.footer`
    background: white;
    padding: 1rem;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const LandingPage = () => {
  return (
      <>
        <Wrapper>
            <Header>
                <LogoContainer>
                    <Logo/> 
                </LogoContainer>
                <ButtonContainer>
                    <LogButton>Log in</LogButton>
                </ButtonContainer>
            </Header>
            <Main>
                <CreateAccountButton>
                    Create Account
                </CreateAccountButton>
            </Main>
        </Wrapper>
        <Section>
            Section
        </Section>
        <Footer>
            Footer
        </Footer>
   </>
  );
}
export default LandingPage;
