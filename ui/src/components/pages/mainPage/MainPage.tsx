import { FC, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainContent from './MainContent';
import TopBar from './TopBar';
import ProfilePage from '../profilePage/ProfilePage';
import WeddingsPage from '../weddingsPage/WeddingsPage';
import { boolean } from 'yup/lib/locale';
import LandingPage from '../landingPage/LandingPage';


const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const MainPage: FC = () => {

    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

    const loggedOutHandler = () => {
        setIsLoggedOut(true);
        sessionStorage.removeItem('jwtToken');

    }

    return (
        <Router>
            {!isLoggedOut &&
                <Wrapper>
                    <TopBar loggedOut={loggedOutHandler} />
                    <Switch>
                        <Route path="/profile" exact>
                            < ProfilePage />
                        </Route>
                        <Route path="/weddings" exact>
                            <WeddingsPage />
                        </Route>
                        <Route path="/main" exact>
                            <MainContent />
                        </Route>
                    </Switch>
                </Wrapper>
            }
            {isLoggedOut &&
                <LandingPage/>
            }
        </Router>
    );
}

export default MainPage;