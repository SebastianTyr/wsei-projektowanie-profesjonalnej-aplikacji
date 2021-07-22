import { FC, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

import MainContent from './MainContent';
import TopBar from './TopBar';
import ProfilePage from '../profilePage/ProfilePage';
import WeddingsPage from '../weddingsPage/WeddingsPage';
import LandingPage from '../landingPage/LandingPage';
import MessagePage from '../messagePage/MessagePage';
import { getCurrentUserDetails } from '../../../actions/currentUserDetailsActions';
import { getIncomingWeddingDetails } from '../../../actions/incomingWeddingDetailsActions';



type GetCurrentUserDetails = ReturnType<typeof getCurrentUserDetails>;
type GetIncomingWeddingDetails = ReturnType <typeof getIncomingWeddingDetails>



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
        dispatch<GetIncomingWeddingDetails>(getIncomingWeddingDetails());
    }, []);



    const hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/pairMessages', {
        accessTokenFactory: () => String(sessionStorage.getItem('jwtToken'))}).build();
      hubConnection.start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log(err));
      
      hubConnection.on('pairCreated', data => alert(`Nowa para między ${data.firstUserFirstName} - ${data.secondUserFirstName}`));
      
      

    return (
        <Router>
            {!isLoggedOut &&
                <Wrapper>
                    <TopBar loggedOut={loggedOutHandler} />
                    <Switch>
                        <Route path="/profile" exact>
                            <ProfilePage/>
                        </Route>
                        <Route path="/message" exact>
                            <MessagePage/>
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