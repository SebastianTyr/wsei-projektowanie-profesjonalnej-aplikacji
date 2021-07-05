import { useState } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { CreateAccountButton } from '../../registrationForm/common';
import RegistrationForm from '../../registrationForm/RegistrationForm';

const Wrapper = styled.div`
    background-color: rgba(0,0,0,.4);
    min-height: 100vh;
    background-image: url("./media/images/landing-background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
`
const Header = styled.header`
    background: ${Colors.white};
    padding: 0.5rem 1rem;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
`
const LogoContainer = styled.div`
    display: block;
    width: 9.5rem;
    height: 3.75rem;
    margin-right: 0.5rem;
`
const Logo = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("./media/icons/logo.png");
    background-repeat: no-repeat;
    background-size: cover;
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

const Section = styled.section`
    background: ${Colors.white};
    padding: 1rem;
    min-height: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Footer = styled.footer`
    background: ${Colors.white};
    padding: 1rem;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LandingPage: FC = () => {

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const createButtonHandler = () => {
        setIsCreating(isCreating => !isCreating);
    };

    return (
        <>
            <Wrapper>
                <Header>
                    <LogoContainer>
                        <Logo />
                    </LogoContainer>
                    <ButtonContainer>
                        <LogButton>Log in</LogButton>
                    </ButtonContainer>
                </Header>
                <Main>
                    {isCreating &&
                        <RegistrationForm />
                    }
                    {!isCreating &&
                        <CreateAccountButton onClick={createButtonHandler}>
                            Create Account
                        </CreateAccountButton>
                    }
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
