import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';


interface IconButtonGenericProps {
    className?: string;
    alt: string;
    src: string;
}
  
const IconButton = styled.img`
    &.sm {
        width: 1rem;
        height: 1rem;
    }
    &.md {
        width: 1.5rem;
        height: 1.5rem;
    }
    &.lg {
        width: 2rem;
        height: 2rem;
    }
    &.xl {
        width: 2.5rem;
        height: 2.5rem;
    }
    &.xxl {
        width: 3rem;
        height: 3rem;
    }
    &.rounded {
        border-radius: 50%;
    }
    &.white {
        background: ${Colors.white};
    }
    &.h-margin-right-8 {
        margin-right: 0.5rem;
    }
    &.h-margin-left-8 {
        margin-left: 0.5rem;
    }
    &.h-margin-right-16 {
        margin-right: 1rem;
    }
`;

export const IconButtonGeneric = (props: IconButtonGenericProps) => {

    return (
        <IconButton className={props.className} src={props.src} alt={props.alt}/>
    )
}
export default IconButtonGeneric;