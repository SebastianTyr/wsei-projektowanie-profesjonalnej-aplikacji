import { useState } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Border } from '../../../styledHelpers/Border';
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
    background-position: center 66%;
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
    margin-top: 2.625rem;
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
    padding:  ${Padding[128]} ${Padding[16]};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const SectionHeader = styled.h2`
    font-size: ${FontSize[36]};
    color: ${Colors.navy};
    margin-bottom: 100px;
`
const InstructionContainer = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    p {
        font-size: ${FontSize[24]};
        font-weight: 500;
        color: ${Colors.navy};
    }
    svg path{
        fill: ${Colors.white};
    }
`
const Register = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const RegisterImageContainer = styled.div`
    width: 200px;
    height: 200px;
    margin-bottom: ${Margin[56]};
    padding: ${Padding[16]};
    border: ${Border.red};
    background-color: ${Colors.white};
    border-radius: 0.6rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    &:active {
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    }
`
const RegisterImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("./media/icons/register.svg");
    background-repeat: no-repeat;
    background-size: cover;
`
const Find = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const FindImageContainer = styled.div`
    width: 200px;
    height: 200px;
    margin-bottom: ${Margin[56]};
    padding: ${Padding[16]};
    border: ${Border.red};
    background-color: ${Colors.white};
    border-radius: 0.6rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    &:active {
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    }
`
const FindImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("./media/icons/find.svg");
    background-repeat: no-repeat;
    background-size: cover;
`
const HaveFun = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const HaveFunImageContainer = styled.div`
    width: 200px;
    height: 200px;
    margin-bottom: ${Margin[56]};
    padding: ${Padding[16]};
    border: ${Border.red};
    background-color: ${Colors.white};
    border-radius: 0.6rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    &:active {
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    }
`
const HaveFunImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("./media/icons/dance.svg");
    background-repeat: no-repeat;
    background-size: cover;
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
                                    <Info>Trafileś w dobre miejsce!</Info>
                                </div>
                                <div>
                                    <Info>Pomożemy ci znależć odpowiednią osobę na ten wyjątkowy wieczór.</Info>
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
               <SectionHeader> Jak to działa? </SectionHeader>
               <InstructionContainer>
                    <Register>
                        <RegisterImageContainer>
                            <RegisterImage/>
                        </RegisterImageContainer>
                        <p>Zarejestruj się</p>
                    </Register>
                    <Find>
                        <FindImageContainer> 
                            <FindImage/>
                        </FindImageContainer>
                        <p>Znajdź partnera</p>
                    </Find>
                    <HaveFun>
                        <HaveFunImageContainer> 
                            <HaveFunImage/>
                        </HaveFunImageContainer>
                        <p>Bawcie się do rana!</p>
                    </HaveFun>
               </InstructionContainer>
            </Section>
            <Footer>
             
            </Footer>
        </>
    );
}
export default LandingPage;
