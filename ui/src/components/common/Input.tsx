import { FC } from "react";
import { Field } from "formik";

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
        <Field className={props.className} id={props.id} type={props.type} name={props.name} aria-labelledby={props.ariaLabelledby} value={props.value}/>
    );
}
export default Input;