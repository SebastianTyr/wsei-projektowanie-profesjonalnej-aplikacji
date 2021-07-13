

import { createGlobalStyle } from 'styled-components';
import { Colors } from './styledHelpers/Colors';
import LandingPage from './components/pages/landingPage/LandingPage';
import MainPage from './components/pages/mainPage/MainPage';
import { FontSize } from './styledHelpers/FontSize';
import LoginPage from './components/pages/loginPage/LoginPage';

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
  }
  input {
    font-size: ${FontSize[16]};
    padding: 0.25em 0.5em;
    background-color: ${Colors.white};
    border: 2px solid #8b8a8b;
    border-radius: 4px;
    transition: 180ms box-shadow ease-in-out;

    &:focus {
        border-color: hsl(245, 100%, 42%);
        box-shadow: 0 0 0 3px hsla(245, 100%,calc(42% + 40%),0.8);
        outline: 3px solid transparent;
    }

    &:not(textarea) {
        line-height: 1;
        height: 2.25rem;
    }
    &[type="file"] {
        font-size: 0.9em;
        padding-top: 0.35rem;
    }
    &[readonly] {
        border-style: dotted;
        cursor: not-allowed;
        color: #777;
    }
    &[disabled] {
        background-color: #eee;
        cursor: not-allowed;
    }

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
    <>
        <Reset />
        <GlobalStyle />
        <Scrollbar />
        <LoginPage />
        <LandingPage />
        <MainPage/>
    </>
  );
}
export default App;
