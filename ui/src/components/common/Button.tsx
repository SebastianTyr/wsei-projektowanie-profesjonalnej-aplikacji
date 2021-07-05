import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Border } from '../../styledHelpers/Border';
import { Colors } from '../../styledHelpers/Colors';
import { FontSize } from '../../styledHelpers/FontSize';
import { Gradient } from '../../styledHelpers/Gradient';
import { Padding } from '../../styledHelpers/Padding';

interface ButtonProps {
    variant: string;
    size: string;
    text: string;
    type: string;
    onClick?: () => void;
}

const GenericButton = styled.button<{variant: string; size: string; text: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    padding: ${Padding[8]} ${Padding[16]};
    font-size: ${FontSize[14]};
    z-index: 1;
    font-weight: 600;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
    &:active {
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    }

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
        min-width: 6rem;
        height: 3rem;  
    `}
    /* XL */
    ${props => props.size === "xl" && css`
        min-width: 16rem;
        height: 4rem;  
    `}

    /* PRIMARY */
    ${props => props.variant === "primary" && css`
        color: ${Colors.red};
        border: ${Border.red};
        background-color: ${Colors.white};
        border-radius: 0.6rem;
        background-image: none;
        
        &:hover {
          color: ${Colors.white};
          background-image: ${Gradient.orangePink};
        }
    `}
    /* PRIMARY DISABLED*/
    ${props => props.variant === "primary--disabled" && css`
        border-radius: 0.6rem;
        color: rgba(255, 255, 255, 0.6);
        box-shadow: none;
        background-color: rgba(255, 255, 255, 0.5); 
        cursor: default;
        pointer-events: none;
        &:hover {
            background-color: rgba(255, 255, 255, 0.12);
        }
    `}
    /* SECONDARY */
    ${props => props.variant === "secondary" && css`
        color: ${Colors.white};
        background-image: ${Gradient.orangePink};
        border-radius: 3rem;
        &:hover {
            background-image: ${Gradient.pinkOrange};
        }
    `}
    /* SECONDARY DISABLED*/
    ${props => props.variant === "secondary--disabled" && css`
        border-radius: 3rem;
        color: rgba(255, 255, 255, 0.6);
        box-shadow: none;
        background-color: rgba(255, 255, 255, 0.5); 
        cursor: default;
        pointer-events: none;
        &:hover {
            background-color: rgba(255, 255, 255, 0.12);
        }
    `}
`

const Button:FC<ButtonProps> = (props) =>{
    return (
        <GenericButton variant={props.variant} size={props.size} text={props.text} onClick={props.onClick} >{props.text}</GenericButton>
    )
}
export default Button;