import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import { Colors } from "../../styledHelpers/Colors";
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import { Margin } from "../../styledHelpers/Margin";
import ErrorBox from "../common/ErrorBox";


const Wrapper = styled.div`
    width: 600px;
    background: ${Colors.white};
    color: ${Colors.black};
    padding: 20px;
    z-index: 10000;
    border-radius: 5%;
   .registration-form__label {
       margin-bottom: ${Margin[8]};
   }
   .registration-form__input {
       margin-bottom: ${Margin[8]};
   }
`;

const HeaderWrapper = styled.div`

`;

const CustomForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;

const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;
`;

const ButtonWrapper = styled(FormItem)`
    border: none;
`;

interface ILoginData {
    email: string,
    password: string
}

const LoginForm = () => {

    const initialValues: ILoginData = {
        email: '',
        password: ''
    }

    return (
        <Wrapper>
            <HeaderWrapper>
                <h2>Zaloguj się</h2>
            </HeaderWrapper>

            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    console.log(values)
                
                    const loginData = {
                        email: values.email,
                        password: values.password
                    };
                    
                    console.log(loginData);

                    fetch('https://localhost:5001/Users/signIn', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(loginData)
                    }).then(() => {
                        console.log('login data sent')
                    });
                }}
            >
                <CustomForm>
                    <FormItem>
                        <Label htmlFor='email' labelName="Email" className="registration-form__label" />
                        <Input id='email' type='email' name='email' className="registration-form__input" />
                        <ErrorMessage name="email" render={error => <ErrorBox errorText={error} />} />
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='password' labelName="Hasło" className="registration-form__label" />
                        <Input id='password' type='password' name='password' className="registration-form__input" />
                        <ErrorMessage name="password" render={error => <ErrorBox errorText={error} />} />
                    </FormItem>
                    <ButtonWrapper>
                        <Button type='submit' variant="secondary" size="lg" text="Zaloguj się" />
                    </ButtonWrapper>
                </CustomForm>


            </Formik>
        </Wrapper>
    )
};

export default LoginForm;