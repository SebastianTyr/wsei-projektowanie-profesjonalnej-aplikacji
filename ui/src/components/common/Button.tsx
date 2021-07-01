import React, { FC } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
    variant: string;
    size: string;
    text: string;
}

const GenericButton = styled.button<{variant: string; size: string; text: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.87);
    z-index: 1;
    font-weight: 500;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    &:active {
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    }

    /* XS */
    ${props => props.size === "xs" && css`
        min-width: 1rem;
        height: 2rem;  
    `}
    /* SM */
    ${props => props.size === "sm" && css`
        min-width: 2rem;
        height: 2rem;  
    `}
    /* MD */
    ${props => props.size === "md" && css`
        min-width: 3rem;
        height: 2.5rem;  
    `}
    /* LG */
    ${props => props.size === "lg" && css`
        min-width: 4rem;
        height: 3rem;  
    `}
    /* XL */
    ${props => props.size === "xl" && css`
        min-width: 6rem;
        height: 4rem;  
    `}

    /* PRIMARY */
    ${props => props.variant === "primary" && css`
        color: rgba(0, 0, 0, 0.87);
        background-color: #90caf9;
        &:hover {
          background-color: rgb(100, 141, 174);
        }
    `}
    /* SECONDARY */
    ${props => props.variant === "secondary" && css`
        color: rgba(0, 0, 0, 0.87);
        background-color: #f48fb1;
        &:hover {
            background-color: rgb(170, 100, 123);
        }
    `}
    /* DISABLED */
    ${props => props.variant === "disabled" && css`
        color: rgba(255, 255, 255, 0.3);
        box-shadow: none;
        background-color: rgba(255, 255, 255, 0.12); 
        cursor: default;
        pointer-events: none;
        &:hover {
            background-color: rgba(255, 255, 255, 0.12);
        }
    `}

`

const Button:FC<ButtonProps> = (props) =>{
    return (
        <GenericButton variant={props.variant} size={props.size} text={props.text}>{props.text}</GenericButton>
    )
}
export default Button;