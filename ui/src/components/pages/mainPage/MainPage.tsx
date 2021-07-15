import { FC } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainContent from './MainContent';
import TopBar from './TopBar';
import ProfilePage from '../profilePage/ProfilePage';


const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const MainPage: FC = () => {
    return (
        <Router>
            <Wrapper>
                <TopBar />
                <Switch>
                    <Route path="/profile" exact>
                        < ProfilePage />
                    </Route>
                    <Route path="/main" exact>
                        <MainContent />
                    </Route>
                </Switch>
            </Wrapper>
        </Router>
    );
}

export default MainPage;