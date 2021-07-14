import { createGlobalStyle } from 'styled-components';
import { Colors } from './styledHelpers/Colors';
import LandingPage from './components/pages/landingPage/LandingPage';
import MainPage from './components/pages/mainPage/MainPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Modal from './components/common/Modal';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${Colors.gray01};
    min-height: 100vh;
    width: 100%;
    color: ${Colors.black};
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    letter-spacing: 0.3px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  ::selection {
    background-color: ${Colors.red};
    color: ${Colors.white};
  }
`;
const Reset = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  button {
    border: none;
    cursor: pointer;
    background: transparent;
    &:focus {
      outline: none;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input {
    &:focus {
      outline: none;
    }
  }
`;
const Scrollbar = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;


function App() {
  return (

    <Router>
      <Reset />
      <Modal />
      <GlobalStyle />
      <Scrollbar />
      <Switch>
        <Route path='/' exact>
          <LandingPage />
        </Route>
        <Route path='/main' exact>
          <MainPage />
        </Route>
      </Switch>
    </Router>

  );
}
export default App;
