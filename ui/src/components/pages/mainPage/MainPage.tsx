import { FC, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainContent from './MainContent';
import TopBar from './TopBar';
import ProfilePage from '../profilePage/ProfilePage';
import WeddingsPage from '../weddingsPage/WeddingsPage';
import LandingPage from '../landingPage/LandingPage';
import { getCurrentUserDetails } from '../../../actions/currentUserDetailsActions';
import { useEffect } from 'react';


type GetCurrentUserDetails = ReturnType<typeof getCurrentUserDetails>;


const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const MainPage: FC = () => {

    const dispatch = useDispatch();


    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

    const loggedOutHandler = () => {
        setIsLoggedOut(true);
        sessionStorage.removeItem('jwtToken');

    }

    useEffect(() => {
        dispatch<GetCurrentUserDetails>(getCurrentUserDetails());
    }, []);



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