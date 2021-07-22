import { createGlobalStyle } from 'styled-components';
import { Colors } from './styledHelpers/Colors';
import LandingPage from './components/pages/landingPage/LandingPage';
import MainPage from './components/pages/mainPage/MainPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Modal from './components/common/Modal';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${Colors.gray05};
    min-height: 100vh;
    width: 100%;
    color: ${Colors.black};
    font-weight: 300;
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
  * {
    margin: 0;
    padding: 0;
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
  p {
    padding: 0;
    margin: 0;
  }
`;
const Scrollbar = createGlobalStyle`
  ::-webkit-scrollbar {
        width: 1.25rem;
        background-color: transparent;
        &-thumb {
          border-radius: 1.375rem;
          border: solid 0.375rem transparent;
          box-shadow: inset 0 0 1rem 1rem #d5d5ce;
          background-color: transparent;
        }
        &-track {
          box-shadow: inset 0 0 1rem 1rem #f0f1f3;
          border: solid 0.375rem transparent;
          &-piece {
            background-color: transparent;
          }
        }
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
