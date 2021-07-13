import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../styledHelpers/Colors';
import { FontSize } from '../../styledHelpers/FontSize';

interface ErrorBoxProps {
    errorText: string;
}

const Wrapper = styled.div<{errorText: string}>`
    font-size: ${FontSize[14]};
    color: ${Colors.red};
    font-weight: 600;
`

const ErrorBox:FC<ErrorBoxProps> = (props) =>{
    return (
        <Wrapper errorText={props.errorText}>{props.errorText}</Wrapper>
    )
}
export default ErrorBox;