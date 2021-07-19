import styled from "styled-components";
import { useState } from 'react';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import ErrorBox from "../common/ErrorBox";
import { Margin } from "../../styledHelpers/Margin";

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
const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;
`;
const ItemsBox = styled.div`
    display: flex;
`;
const CustomForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;
const ButtonWrapper = styled(FormItem)`
    border: none;
`;

interface IAnnouncementData {
    date: string,
    address: {
        street: string,
        city: string,
        postCode: string,
        country: string,
    }
    description: string,
}

const AnnouncementForm = () => {

    const initialValues: IAnnouncementData = {
        date: '',
        address: {
            street: '',
            city: '',
            postCode: '',
            country: '',
        },
        description: '',
    }

    const validationSchema = Yup.object({
        date: Yup.date().required('Proszę podać datę'),
        address: Yup.object({
            street: Yup.string().required('Proszę podaj ulicę'),
            city: Yup.string().required('Proszę podaj miasto'),
            postCode: Yup.string().required('Proszę podaj kod pocztowy'),
            country: Yup.string().required('Proszę podaj kraj'),
        }),
        description: Yup.string().required('Proszę podaj opis wydarzenia'),
    });

    return (
        <Wrapper className="modal">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    console.log(values)
                    const announcement = {
                        date: values.date,
                        address: { street: values.address.street, city: values.address.city, postCode: values.address.postCode, country: values.address.country },
                        description: values.description
                    }

                    fetch('https://localhost:5001/Users/AddIncomingWeddingToUser', {
                        method: 'POST',
                        headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken'), "Content-Type": "application/json" },
                        body: JSON.stringify(announcement)
                    })
                }}
            >
                <CustomForm>
                    <Label labelName="Dodaj wydarzenie" />
                    <FormItem>
                        <Label htmlFor='Date' labelName="Data" className="registration-form__label" />
                        <Input id='Date' type='date' name='date' className="registration-form__input" />
                        <ErrorMessage name='date' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                    </FormItem>
                    <ItemsBox>
                        <Label labelName="Adres" className="registration-form__label" />
                        <FormItem>
                            <Label htmlFor='address' labelName="Ulica" className="registration-form__label" />
                            <Input id='address' type='text' name='address.street' className="registration-form__input" />
                            <ErrorMessage name="address.street" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                            <Label htmlFor='city' labelName="Miasto" className="registration-form__label" />
                            <Input id='city' type='text' name='address.city' className="registration-form__input" />
                            <ErrorMessage name="address.city" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                            <Label htmlFor='postCode' labelName="Kod-Pocztowy" className="registration-form__label" />
                            <Input id='postCode' type='text' name='address.postCode' className="registration-form__input" />
                            <ErrorMessage name="address.postCode" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                            <Label htmlFor='country' labelName="Kraj" className="registration-form__label" />
                            <Input id='country' type='text' name='address.country' className="registration-form__input" />
                            <ErrorMessage name="address.country" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                        </FormItem>
                    </ItemsBox>
                    <ItemsBox>
                        <FormItem>
                            <Label htmlFor='description' labelName="Opis" className="registration-form__label" />
                            <Input id="description" type='textarea' name='description' className="registration-form__input" />
                            <ErrorMessage name='description' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                        </FormItem>
                    </ItemsBox>
                    <ButtonWrapper>
                        <Button type='submit' variant="secondary" size="lg" text="Dodaj wydarzenie" />
                    </ButtonWrapper>
                </CustomForm>
            </Formik>
        </Wrapper>
    )
}

export default AnnouncementForm;