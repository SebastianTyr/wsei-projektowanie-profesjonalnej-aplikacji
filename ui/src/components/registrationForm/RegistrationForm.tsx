import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import { Margin } from "../../styledHelpers/Margin";
import ErrorBox from "../common/ErrorBox";
import { useState } from "react";
import LoginForm from "../loginForm/LoginForm";

const Wrapper = styled.div`
   .registration-form__woman-label {
        margin: 0 ${Margin[8]};  
   }
   .registration-form__man-label {
        margin: 0 ${Margin[8]};   
   }
   .registration-form__label {
        margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};  
   }
   .registration-form__input {
       margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};
   }
   .registration-form__error {
       margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};
   }
`;

const HeaderWrapper = styled.div`
`;

const FormItemsContainer = styled.div`
    margin-left: -${Margin[8]};
    margin-right: -${Margin[8]};
`
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
const RadioGroup = styled.div`
    display: flex;
    align-items: center;
    margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]}; 
`
const ButtonWrapper = styled(FormItem)`
    border: none;
`;
const ItemsBox = styled.div`
    display: flex;
`;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

interface IRegistrationData {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    weight: null,
    height: null,
    gender: string,
    birthDate: Date,
}


const RegistrationForm = (props: any) => {

    const initialValues: IRegistrationData = {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        weight: null,
        height: null,
        gender: '',
        birthDate: new Date()
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('Proszę podać nazwę użytkownika'),
        firstName: Yup.string().required('Proszę podać imię'),
        lastName: Yup.string().required('Proszę podać nazwisko'),
        email: Yup.string().email('Email niepoprawny').required('Proszę podać email'),
        password: Yup.string().min(8, 'Hasło musi mieć co najmniej 8 znaków').required('Proszę podać hasło'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hasło musi się zgadzać').required('Proszę powtórzyć hasło'),
        gender: Yup.string().required('Proszę wskazać płeć'),
        birthDate: Yup.date().required("Proszę podać datę urodzenia")
    });

    const [isRegistered, setIsRegistered] = useState<boolean>(false);



    return (
        <>
            
            {isRegistered &&
                <LoginWrapper>
                    <h2>Aby aktytować konto, proszę się zalogować</h2>
                    <LoginForm />
                </LoginWrapper>
            }

            {!isRegistered &&
                <Wrapper className="modal">
                    <HeaderWrapper className="modal__header">
                        <h2>Utwórz Konto</h2>
                    </HeaderWrapper>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            let userGender = (values.gender === 'female') ? 20 : 10;

                            const newUser = {
                                userName: values.userName,
                                firstName: values.firstName,
                                secondName: values.lastName,
                                email: values.email,
                                password: values.password,
                                confirmPassword: values.confirmPassword,
                                gender: userGender,
                                birthDate: values.birthDate
                            };

                            fetch('https://localhost:5001/Users', {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(newUser)
                            }).then(() => {
                                console.log('new user data sent')
                            }).then(() => { setIsRegistered(true) });
                        }
                        }

                    >
                        <CustomForm>
                            <FormItemsContainer>
                                <FormItem>
                                    <Label htmlFor='userName' labelName="Nazwa Użytkownika" className="registration-form__label" />
                                    <Input id='userName' type='text' name='userName' className="registration-form__input" />
                                    <ErrorMessage name='userName' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                </FormItem>
                                <ItemsBox>
                                    <FormItem>
                                        <Label htmlFor='firstName' labelName="Imię" className="registration-form__label" />
                                        <Input id='firstName' type='text' name='firstName' className="registration-form__input" />
                                        <ErrorMessage name="firstName" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                    <FormItem>
                                        <Label htmlFor='lastName' labelName="Nazwisko" className="registration-form__label" />
                                        <Input id="lastName" type='text' name='lastName' className="registration-form__input" />
                                        <ErrorMessage name='lastName' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                </ItemsBox>
                                <FormItem>
                                    <Label htmlFor='email' labelName="Email" className="registration-form__label" />
                                    <Input id='email' type='email' name='email' className="registration-form__input" />
                                    <ErrorMessage name="email" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                </FormItem>
                                <ItemsBox>
                                    <FormItem>
                                        <Label htmlFor='gender' labelName="Płeć" className="registration-form__label" />
                                        <RadioGroup>
                                            <Input id='start' aria-labelledby='gender' type='radio' name='gender' value='female' /> 
                                            <Label htmlFor='start' labelName="Kobieta" className="registration-form__woman-label"/>
                                            <Input id='end' aria-labelledby='gender' type='radio' name='gender' value='male' /> 
                                            <Label htmlFor='end' labelName="Mężczyzna" className="registration-form__man-label"/>
                                        </RadioGroup>
                                        <ErrorMessage name="gender" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                    <FormItem>
                                        <Label htmlFor='birthDate' labelName="Data urodzenia" className="registration-form__label" />
                                        <Input id='birthDate' type='date' name='birthDate' className="registration-form__input" />
                                        <ErrorMessage name="birthDate" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                </ItemsBox>
                                <ItemsBox>
                                    <FormItem>
                                        <Label htmlFor='password' labelName="Hasło" className="registration-form__label" />
                                        <Input id='password' type='password' name='password' className="registration-form__input" />
                                        <ErrorMessage name="password" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                    <FormItem>
                                        <Label htmlFor='confirmPassword' labelName="Powtórz Hasło" className="registration-form__label" />
                                        <Input id='confirmPassword' type='password' name='confirmPassword' className="registration-form__input" />
                                        <ErrorMessage name="confirmPassword" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                </ItemsBox>
                            </FormItemsContainer>

                            <ButtonWrapper>
                                <Button type='submit' variant="secondary" size="lg" text="Zarejestruj się" />
                            </ButtonWrapper>
                        </CustomForm>
                    </Formik>
                
                </Wrapper >
  
            }
  </>
    );
};

export default RegistrationForm;

