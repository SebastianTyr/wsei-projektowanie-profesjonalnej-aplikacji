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
const FormItemsContainer = styled.div`
    margin-left: -${Margin[8]};
    margin-right: -${Margin[8]};
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

interface IAnnouncementData {
    Date: Date,
    address: string,
    description: string,
}

const AnnouncementForm = () => {

    const initialValues: IAnnouncementData = {
        Date: new Date(),
        address: '',
        description: '',
    }

    const validation = Yup.object({

        Date: Yup.date().required("Podaj date ślubu"),
        address: Yup.string().required("Podaj adres gdzie odbędzie się ślub"),
        description: Yup.string().required("Podaj szczegóły wydarzenia")


    })

    return (
        <Wrapper className="modal">
            <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={values => {

                    const announcement = {
                        Date: values.Date,
                        address: values.address,
                        description: values.description
                    }

                    fetch('https://localhost:5001/Users/AddIncomingWeddingToUser', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(announcement)
                    })
                }}
            >
                <FormItemsContainer>
                    <FormItem>
                        <Label htmlFor='Date' labelName="Data" className="registration-form__label" />
                        <Input id='Date' type='date' name='date' className="registration-form__input" />
                        <ErrorMessage name='date' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                    </FormItem>
                    <ItemsBox>
                        <FormItem>
                            <Label htmlFor='address' labelName="Adres" className="registration-form__label" />
                            <Input id='address' type='text' name='address' className="registration-form__input" />
                            <ErrorMessage name="address" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor='description' labelName="Opis" className="registration-form__label" />
                            <Input id="description" type='text' name='description' className="registration-form__input" />
                            <ErrorMessage name='description' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                        </FormItem>
                    </ItemsBox>
                </FormItemsContainer>
            </Formik>
        </Wrapper>
    )
}

export default AnnouncementForm;