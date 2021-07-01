import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';


import { Colors } from "../../../styledHelpers/Colors";
import { CreateAccountButton } from '../common';
// -------NIE DZIAŁA---------------
import CustomTextInput from "./CustomTextInput";




const Wrapper = styled.div`
    width: 600px;
    background: ${Colors.white};
    color: ${Colors.black};
    padding: 20px;
    z-index: 10000;
    border-radius: 5%;
   
`;

const HeaderWrapper = styled.div`

`;

const CostumForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;

const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;

    label {
        font-size: 15px;
        padding: 10px 0 10px 10px;

    }

    input {
        font-size: 20px;
        border: none;
        border-bottom: 1px solid ${Colors.gray03};
        

        &:focus {
            background-color: ${Colors.gray01};

        }

    }

    div {
        display: felx;
        justify-content: space-between;

    }
`;

const ItemsBox = styled.div`
    display: flex;

`;

const CreateButton = styled(CreateAccountButton)`
    background-color: ${Colors.redMain};
    color: ${Colors.white};

`;

const ErrorBox = styled.div`
    font-size: 14px;
    color: ${Colors.redError};
`;


interface IRegistrationData {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    passowrd: string,
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
        passowrd: '',
        confirmPassword: '',
        weight: null,
        height: null,
        gender: '',
        birthDate: new Date()
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('Proszę podać nazwę użytkownika')
    })


    // const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    // };

    // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(registrationData);
    // };

    return (
        <Wrapper>

            <HeaderWrapper>
                <h2>Utwórz Konto</h2>
            </HeaderWrapper>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
            >

                <CostumForm>
                    <FormItem>
                        <label htmlFor='userName'>Nazwa Użytkownika</label>
                        <Field
                            id='userName'
                            type='text'
                            name='userName'
                        />
                        <ErrorMessage name='userName' render={error => <ErrorBox>{error}</ErrorBox> } />
                    </FormItem>
                    <ItemsBox>
                        <FormItem style={{ marginRight: "20px" }}>
                            <label htmlFor='firstName'>Imię</label>
                            <Field
                                id='firstName'
                                type='text'
                                name='firstName'
                            />
                        </FormItem>
                        <FormItem>
                            <label htmlFor='lastName'>Nazwisko</label>
                            <Field
                                id="lastName"
                                type='text'
                                name='lastName'
                            />
                        </FormItem>
                    </ItemsBox>
                    <FormItem>
                        <label htmlFor='email'>Email</label>
                        <Field
                            id='email'
                            type='email'
                            name='email'
                        />
                    </FormItem>
                    <ItemsBox>
                        <FormItem style={{ marginRight: "20px" }}>
                            <label htmlFor='gender'>Płeć</label>
                            <div>
                                <Field
                                    id='gender'
                                    type='radio'
                                    name='gender'
                                    value='female'
                                /> Kobieta
                                <Field
                                    id='gender'
                                    type='radio'
                                    name='gender'
                                    value='male'
                                /> Mężczyzna
                            </div>
                        </FormItem>
                        <FormItem>
                            <label htmlFor='birthDate'>Data urodzenia</label>
                            <Field
                                id='birthDate'
                                type='date'
                                name='birthDate'

                            />
                        </FormItem>
                    </ItemsBox>
                    <ItemsBox>
                        <FormItem style={{ marginRight: "20px" }}>
                            <label htmlFor='password'>Hasło</label>
                            <Field
                                id='password'
                                type='password'
                                name='passowrd'
                            />
                        </FormItem>
                        <FormItem>
                            <label htmlFor='confirmPassword'>Powtórz Hasło</label>
                            <Field
                                id='confirmPassword'
                                type='password'
                                name='confirmPassword'
                            />
                        </FormItem>
                    </ItemsBox>
                    <FormItem style={{ border: "none" }}>
                        <CreateButton type='submit'>Zarejestruj się</CreateButton>
                    </FormItem>
                </CostumForm>
            </Formik>
        </Wrapper>
    );
};

export default RegistrationForm;