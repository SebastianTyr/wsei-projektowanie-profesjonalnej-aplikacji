import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import { Colors } from "../../styledHelpers/Colors";
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import { Margin } from "../../styledHelpers/Margin";
import ErrorBox from "../common/ErrorBox";
import { FontSize } from "../../styledHelpers/FontSize";

const Wrapper = styled.div`
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
`
const ButtonWrapper = styled(FormItem)`
    border: none;
`;
const ItemsBox = styled.div`
    display: flex;
`;

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


const RegistrationForm = () => {

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
        password: Yup.string().min(6, 'Hasło musi mieć co najmniej 6 znaków').required('Proszę podać hasło'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hasło musi się zgadzać').required('Proszę powtórzyć hasło'),
        gender: Yup.string().required('Proszę wskazać płeć'),
        birthDate: Yup.date().required("Proszę podać datę urodzenia")
    })

    return (
        <Wrapper className="modal">
            <HeaderWrapper className="modal__header">
                <h2>Utwórz Konto</h2>
            </HeaderWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
            >
                <CustomForm>
                    <FormItemsContainer>
                        <FormItem>
                            <Label htmlFor='userName' labelName="Nazwa Użytkownika" className="registration-form__label"/>
                            <Input  id='userName' type='text' name='userName' className="registration-form__input"/>
                            <ErrorMessage name='userName' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                        </FormItem>
                        <ItemsBox>
                            <FormItem>
                                <Label htmlFor='firstName' labelName="Imię" className="registration-form__label"/>
                                <Input id='firstName' type='text' name='firstName' className="registration-form__input"/>
                                <ErrorMessage name="firstName" render={error => <ErrorBox errorText={error} className="registration-form__error"/>} />
                            </FormItem>
                            <FormItem>
                                <Label htmlFor='lastName' labelName="Nazwisko" className="registration-form__label"/>
                                <Input id="lastName" type='text' name='lastName' className="registration-form__input"/>
                                <ErrorMessage name='lastName' render={error => <ErrorBox errorText={error} className="registration-form__error"/>} />
                            </FormItem>
                        </ItemsBox>
                        <FormItem>
                            <Label htmlFor='email' labelName="Email" className="registration-form__label"/>
                            <Input id='email' type='email' name='email' className="registration-form__input"/>
                            <ErrorMessage name="email" render={error => <ErrorBox errorText={error} className="registration-form__error"/>} />
                        </FormItem>
                        <ItemsBox>
                            <FormItem>
                                <Label htmlFor='gender' labelName="Płeć" className="registration-form__label"/>
                                <RadioGroup>
                                    <Input id='start' aria-labelledby='gender' type='radio' name='gender' value='female'/> Kobieta
                                    <Input id='end' aria-labelledby='gender' type='radio' name='gender' value='male'/> Mężczyzna
                                </RadioGroup>
                                <ErrorMessage name="gender" render={error => <ErrorBox errorText={error} className="registration-form__error"/>} />
                            </FormItem>
                            <FormItem>
                                <Label htmlFor='birthDate' labelName="Data urodzenia" className="registration-form__label"/>
                                <Input id='birthDate' type='date' name='birthDate' className="registration-form__input"/>
                                <ErrorMessage name="birthDate" render={error => <ErrorBox errorText={error} className="registration-form__error"/>} />
                            </FormItem>
                        </ItemsBox>
                        <ItemsBox>
                            <FormItem>
                                <Label htmlFor='password' labelName="Hasło" className="registration-form__label"/>
                                <Input id='password' type='password' name='password' className="registration-form__input"/>
                                <ErrorMessage name="password" render={error => <ErrorBox errorText={error} className="registration-form__error"/>} />
                            </FormItem>
                            <FormItem>
                                <Label htmlFor='confirmPassword' labelName="Powtórz Hasło" className="registration-form__label"/>
                                <Input id='confirmPassword' type='password' name='confirmPassword' className="registration-form__input"/>
                                <ErrorMessage name="confirmPassword" render={error => <ErrorBox errorText={error} className="registration-form__error"/>} />
                            </FormItem>
                        </ItemsBox>
                    </FormItemsContainer>
                 
                    <ButtonWrapper>
                        <Button type='submit' variant="secondary" size="lg" text="Zarejestruj się"/>
                    </ButtonWrapper>
                </CustomForm>
            </Formik>
        </Wrapper>
    );
};

export default RegistrationForm;

