import React from 'react';

import { createGlobalStyle } from 'styled-components';
import { Colors } from './styledHelpers/Colors';
import LandingPage from './pages/LandingPage';
import MainPage from './pages//mainPage/MainPage';

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
      {/* <LandingPage /> */}
      <MainPage></MainPage>
    </>
  );
}

export default App;
