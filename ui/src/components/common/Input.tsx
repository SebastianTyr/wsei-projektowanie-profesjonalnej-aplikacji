import { FC } from "react";
import { Field } from "formik";
import { Colors } from "../../styledHelpers/Colors";
import { createGlobalStyle } from "styled-components";
import { FontSize } from "../../styledHelpers/FontSize";
import { Border } from "../../styledHelpers/Border";

interface InputProps {
    id: string;
    type: string;
    name?: string;
    className?: string;
    ariaLabelledby?: string;
    value?: string;
}

const GlobalStyle = createGlobalStyle`
  input {
    font-size: ${FontSize[16]};
    padding: 0.25em 0.5em;
    background-color: ${Colors.white};
    border: ${Border.navy};
    border-radius: 4px;
    transition: 180ms box-shadow ease-in-out; */
    &::focus, &::active {
        border: ${Border.red};
        box-shadow: 0 0 0 3px rgba(255, 120, 84, 0.4);
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
    textarea {
        resize: none;
        border: ${Border.navy};
        border-radius: 4px;
    }
`;

const Input:FC<InputProps>= (props) => {
    return (
        <>
            <GlobalStyle />
            <Field className={props.className} id={props.id} type={props.type} name={props.name} aria-labelledby={props.ariaLabelledby} value={props.value}/>
        </>
    );
}
export default Input;