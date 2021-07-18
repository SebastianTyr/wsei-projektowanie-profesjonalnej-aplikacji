import { FC } from "react";
import styled from "styled-components";
import { Colors } from "../../styledHelpers/Colors";
import { FontSize } from "../../styledHelpers/FontSize";

const LabelWrapper = styled.label`
    font-size: ${FontSize[16]};
    color: ${Colors.navy};
    font-weight: 600;
`;

interface LabelProps {
    labelName: string;
    htmlFor?: string;
    className?: string;
}

const Label:FC<LabelProps>= (props) => {
    return (
        <LabelWrapper htmlFor={props.htmlFor} className={props.className}> {props.labelName} </LabelWrapper>
    );
}
export default Label;