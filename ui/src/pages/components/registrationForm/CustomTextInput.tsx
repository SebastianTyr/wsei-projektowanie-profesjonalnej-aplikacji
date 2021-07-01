import React from 'react';
import styled from "styled-components";
import { useField } from "formik";
import { Colors } from "../../../styledHelpers/Colors";





const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;

    label {
        font-size: 15px;
        padding: 10px 0 10px 10px;

    }

    input {
        font-size: 20px;
        border: none;
        border-bottom: 1px solid ${Colors.gray03};
        

        &:focus {
            background-color: ${Colors.gray01};

        }

    }

    div {
        display: felx;
        justify-content: space-between;

    }

`;


const ErrorBox = styled.div`
    font-size: 14px;
    color: ${Colors.redError};
`;

//  -------------- NIE DZIAŁA --------------
export default function CustomTextInput(label: any, ...props: any) {

    const [field, meta] = useField(props);
    console.log(field, meta);

    return (
        // <Wrapper error={meta.touched && !!meta.error}>
        <Wrapper>
            <label htmlFor={props.name}>{label}</label>
            <input
                {...field} {...props}
                autoComplete="off"
            />
            {meta.touched && meta.error ? (
                <ErrorBox>{meta.error}</ErrorBox>
            ) : null}

        </Wrapper>
    );
}

