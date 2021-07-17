import { useState } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';
import { Padding } from '../../../styledHelpers/Padding';
import Button from '../../common/Button';
import LoginForm from '../../loginForm/LoginForm';
import RegistrationForm from '../../registrationForm/RegistrationForm';

const Wrapper = styled.div`
    background-color: rgba(0,0,0,.4);
    min-height: 100vh;
    background-image: url("./media/images/landing-background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center -7.5rem;
    .landing-page__button {
        margin: 0 auto;
    }
`
const Header = styled.header`
    background: ${Colors.white};
    padding: 0.5rem 1rem;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
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
    padding: ${Padding[16]};
    color: ${Colors.white};
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
const Content = styled.div`
    z-index: 1;
    margin-top: 9.625rem;
`
const InfoContainer = styled.div`
    margin-top: ${Margin[16]};
    margin-bottom: 3rem;
`
const Info = styled.p`
    display: inline-block;
    color: ${Colors.white};
    z-index: 1;
    text-shadow: 2px 1px 6px ${Colors.red};
    margin-bottom: ${Margin[8]};
    font-size: ${FontSize[36]};
`
const ButtonsContainer = styled.div`
    display: flex;
`;
const SingleButtonContainer = styled.div`
    display: flex;
    margin-left: ${Margin[16]};
`
const Section = styled.section`
    background-color: ${Colors.white};
    padding: ${Padding[16]};
    min-height: 50rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SectionHowItWorks = styled.section`
    background-color: ${Colors.white};
    padding: 1rem;
    min-height: 25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Footer = styled.footer`
    background: ${Colors.navy};
    padding: ${Padding[16]};
    min-height: 6.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LandingPage: FC = () => {

    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const createButtonHandler = () => {
        setIsCreating(!isCreating);
        setIsLogin(false);
    };

    const loginButtonHandler = () => {
        setIsLogin(!isLogin);
        setIsCreating(false);
    };

    return (
        <>
            <Wrapper>
                <Header>
                    <LogoContainer>
                            <Logo />
                    </LogoContainer>
                    <ButtonsContainer>
                        <SingleButtonContainer>
                            <Button type="text" variant="primary" size="lg" text="Zarejestruj się" onClick={createButtonHandler} />
                        </SingleButtonContainer>
                        <SingleButtonContainer>
                            <Button type="text" variant="primary" size="lg" text="Zaloguj się" onClick={loginButtonHandler} />
                        </SingleButtonContainer>
                    </ButtonsContainer>
                </Header>
                <Main>
                    {isCreating &&
                        <RegistrationForm />
                    }
                    {isLogin &&
                        <LoginForm />
                    }
                    {(!isCreating && !isLogin) &&
                        <Content>
                            <InfoContainer>
                                <div>
                                    <Info>Zbliża się wesele, a Ty nie masz z kim iść?</Info>
                                </div>
                                <div>
                                    <Info>Partner/Partnerka odmówili na kilka dni przed ?</Info>
                                </div>
                                <div>
                                    <Info>Trafileś w dobre miejsce! Pomożemy ci znależć odpowiednią osobę na ten wyjątkowy wieczór.</Info>
                                </div>
                                <div>
                                    <Info>Załóż konto i baw się świetnie na weselu !</Info>
                                </div>
                            </InfoContainer>
                            <Button type="text" variant="secondary" size="xl" text="Załóż konto" className="landing-page__button" onClick={createButtonHandler} />
                        </Content>
                    }
                </Main>
            </Wrapper>
            <Section>
               cos
            </Section>
            <SectionHowItWorks>
              
            </SectionHowItWorks>
            <Footer>
             
            </Footer>
        </>
    );
}
export default LandingPage;
