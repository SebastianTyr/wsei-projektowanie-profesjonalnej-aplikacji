import React from 'react';
import { createGlobalStyle } from 'styled-components';
import LandingPage from './pages/LandingPage';
import { Colors } from './styledHelpers/Colors';

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
    overflow: hidden;
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
    border-radius: 6px;
    width: 7px;
    height: 7px;
    background-color: ${Colors.gray02};
      &-track {
        border-radius: 6px;
        width: 7px;
        background-color: transparent;
        &-piece {
          border-radius: 6px;
          background-color: ${Colors.gray02};
        }
      }
      &-thumb {
        border-radius: 6px;
        background-color: ${Colors.gray03};
      }
    }
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Scrollbar />
      <LandingPage />
    </>
  );
}

export default App;
