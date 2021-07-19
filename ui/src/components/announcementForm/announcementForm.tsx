import styled from "styled-components";
import { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import ErrorBox from "../common/ErrorBox";
import { Margin } from "../../styledHelpers/Margin";
import { Colors } from "../../styledHelpers/Colors";
import { FontSize } from "../../styledHelpers/FontSize";

const Wrapper = styled.div`
   .registration-form__label {
        margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};  
   }
   .registration-form__input {
       margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};
       width: calc(100% - 0.5rem);
   }
   .registration-form__error {
       margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};
   }
`;
const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: ${Margin[16]};
`;
const SectionHeader = styled.span`
    font-size: ${FontSize[20]};
    color: ${Colors.navy};
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 ${Margin[8]} ${Margin[16]} ${Margin[8]};
`
const InputContainer = styled.div`
    margin-top: ${Margin[8]};
`;
const SingleItem = styled.div`
    width: 50%;
    margin-bottom: ${Margin[8]};
`;
const ItemsBox = styled.div`
    display: flex;
    align-items: center;
`
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
        <div className="modal">
            <div className="modal__background"> </div>
            <Wrapper className="modal__container">
                <div className="modal__header">
                    <h2>Dodaj wydarzenie</h2>
                </div>
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

                        <FormItem>
                            <Label htmlFor='Date' labelName="Data" className="registration-form__label" />
                            <Input id='Date' type='date' name='date' className="registration-form__input" />
                            <ErrorMessage name='date' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                        </FormItem>
                            <SectionHeader>Adres:</SectionHeader>
                            <FormItem>
                                <ItemsBox>
                                    <SingleItem>
                                        <Label htmlFor='address' labelName="Ulica" className="registration-form__label" />
                                        <InputContainer>
                                            <Input id='address' type='text' name='address.street' className="registration-form__input" />
                                            <ErrorMessage name="address.street" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                        </InputContainer>
                                    </SingleItem>
                                    <SingleItem>
                                        <Label htmlFor='city' labelName="Miasto" className="registration-form__label" />
                                        <InputContainer>
                                            <Input id='city' type='text' name='address.city' className="registration-form__input" />
                                            <ErrorMessage name="address.city" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                        </InputContainer>
                                    </SingleItem>
                                </ItemsBox>
                                <ItemsBox>
                                    <SingleItem>
                                        <Label htmlFor='postCode' labelName="Kod pocztowy" className="registration-form__label" />
                                        <InputContainer>
                                            <Input id='postCode' type='text' name='address.postCode' className="registration-form__input" />
                                            <ErrorMessage name="address.postCode" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                        </InputContainer>
                                    </SingleItem>
                                    <SingleItem>
                                        <Label htmlFor='country' labelName="Kraj" className="registration-form__label" />
                                        <InputContainer>
                                            <Input id='country' type='text' name='address.country' className="registration-form__input" />
                                            <ErrorMessage name="address.country" render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                        </InputContainer>
                                    </SingleItem>
                                </ItemsBox>
                            </FormItem>
                            <FormItem>
                                <Label htmlFor='description' labelName="Opis" className="registration-form__label" />
                                <Field as='textarea'
                                    cols="30" 
                                    rows="5"
                                    id='description'
                                    type='text'
                                    name='description'
                                    className="registration-form__input"
                                />
                                <ErrorMessage name='description' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                            </FormItem>
                        <ButtonWrapper>
                            <Button type='submit' variant="secondary" size="lg" text="Dodaj wydarzenie" />
                        </ButtonWrapper>
                    </CustomForm>
                </Formik>
            </Wrapper>
        </div>
    )
}

export default AnnouncementForm;