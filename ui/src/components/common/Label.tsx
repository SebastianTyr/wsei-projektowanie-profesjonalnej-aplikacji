import { FC } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "../../styledHelpers/Colors";
import { FontSize } from "../../styledHelpers/FontSize";

const LabelWrapper = styled.label`
    font-size: ${FontSize[16]};
`;

interface LabelProps {
    labelName: string;
    htmlFor?: string;
    className?: string;
}

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
        border-color: ${Colors.red};
        box-shadow: 0 0 0 3px rgba(255, 120, 84, 0.4);
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

const Label:FC<LabelProps>= (props) => {
    return (
        <>
        <GlobalStyle />
        <LabelWrapper htmlFor={props.htmlFor} className={props.className}> {props.labelName} </LabelWrapper>
        </>
    );
}
export default Label;