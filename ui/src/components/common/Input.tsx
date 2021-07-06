import { validateYupSchema } from "formik";
import { FC } from "react";
import styled from "styled-components";
import { string } from "yup/lib/locale";
import { Colors } from "../../styledHelpers/Colors";
import { FontSize } from "../../styledHelpers/FontSize";

const InputWrapper = styled.input`
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
`;

interface InputProps {
    id: string;
    type: string;
    name?: string;
    className?: string;
    ariaLabelledby?: string;
    value?: string;
}

const Input:FC<InputProps>= (props) => {
    return (
        <InputWrapper className={props.className} id={props.id} type={props.type} name={props.name} aria-labelledby={props.ariaLabelledby} value={props.value}/>
    );
}
export default Input;