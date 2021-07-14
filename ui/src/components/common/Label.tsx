import { FC } from "react";
import styled from "styled-components";
import { FontSize } from "../../styledHelpers/FontSize";

const LabelWrapper = styled.label`
    font-size: ${FontSize[16]};
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