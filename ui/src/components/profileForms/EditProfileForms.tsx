import styled from "styled-components";
import { Formik, Form, ErrorMessage, Field } from "formik";

import { Colors } from "../../styledHelpers/Colors";
import { FontSize } from "../../styledHelpers/FontSize";
import { Padding } from "../../styledHelpers/Padding";
import ImageForm from "./ImageForm";
import Input from "../common/Input";
import Label from "../common/Label";
import Button from "../common/Button";
import { Margin } from "../../styledHelpers/Margin";
import { useState } from "react";
import DetailsForm from "./DetialsForm";
import { useSelector } from "react-redux";
import { IState } from "../../reducers";
import { ICurrentUserDetailsReducers } from "../../reducers/currentUserDetailsReducers";
import IconButtonGeneric from "../common/IconButtonGeneric";
import { Gradient } from "../../styledHelpers/Gradient";
import ErrorBox from "../common/ErrorBox";


const Wrapper = styled.div`
    position: relative;
    background-color: ${Colors.white};
    width: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

    .registration-form__woman-label {
        margin: 0 ${Margin[8]};  
    }
    .registration-form__man-label {
            margin: 0 ${Margin[8]};   
    }
    .registration-form__label {
            margin-bottom: ${Margin[8]};  
    }
    .registration-form__error {
        margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};
    }
`
const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;
`;
const CloseWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${Gradient.orangePink};
  border-radius: 50%;
  position: relative;
  border: 0;
  cursor: pointer;
`;

const CloseWrapperBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  position: absolute;
  top: 0;
  right: 0.5rem;
`;

const IconWrapper = styled.span`
    width: 30px;
    height: 100%;
    padding: 0 ${Padding[8]};

    img {
        width: 100%;
        height: 100%;
    }
`;

const FormsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InfoFormsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    padding: 0 ${Padding[40]} 0 0;
    height: 100%;
`;

const InfoContainer = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        tr {
            &:nth-child(even) {
                background-color: ${Colors.gray05};
            }
            td {
                padding: ${Padding[16]};
                &:first-child {
                    font-size: ${FontSize[20]};
                    color: ${Colors.navy};
                    font-weight: 500;
                }
                &:last-child {
                    font-size: ${FontSize[18]};
                    color: ${Colors.red};
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    input, label {
                        margin-right: 0.5rem;
                    }
                }
            }

        }
    }
`;

const ButtonsWrapper = styled.div`
    margin-top: ${Margin[24]};
    display: flex;
    justify-content: flex-end;
`;

interface IEditProfileFormsProps {
    closeClick(): void,
}

const EditProfileForms = (props: IEditProfileFormsProps) => {

    const { currentUserDetails } = useSelector<IState, ICurrentUserDetailsReducers>(state => ({
        ...state.currentUserDetails
    }));

    const [isDetailsFormVisible, setIsDetailsFormVisible] = useState<boolean>(false);

    const displayDeatilsForm = () => {
        setIsDetailsFormVisible(true);
        console.log(isDetailsFormVisible);
    }

    const closeDetailsForm = () => {
        setIsDetailsFormVisible(false);
    }

    return (
        <>
            {isDetailsFormVisible ?
                <DetailsForm closeClick={closeDetailsForm } />
                :
                <Wrapper className="modal modal--simple">
                    <CloseWrapperBox>
                            <CloseWrapper onClick={props.closeClick}>
                                <IconButtonGeneric className="md" src="./media/icons/close.svg" alt="close icon" />
                            </CloseWrapper>
                    </CloseWrapperBox>
                    <div className="modal__header">
                        <h2>Edytuj Profil</h2>
                    </div>
                    <FormsWrapper>
                        <ImageContainer>
                            <ImageForm />
                            <Button type='button' variant="secondary" size="lg" text="Dodaj więcej informacji" onClick={displayDeatilsForm} />
                        </ImageContainer>
                        <InfoFormsWrapper>
                            <Formik
                                initialValues={{ init: 'hej' }}
                                onSubmit={values => console.log(values)}
                            >
                                <Form>
                                    <FormItem>
                                        <Label htmlFor='userName' labelName="Imie" className="registration-form__label" />
                                        <Input type='text' id='firstName' name='fristName' value={currentUserDetails?.firstName} />
                                        <ErrorMessage name='userName' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                    <FormItem>
                                        <Label htmlFor='userName' labelName="Nazwisko" className="registration-form__label" />
                                        <Input type='text' id='secondName' name='secondName' value={currentUserDetails?.secondName} />
                                        <ErrorMessage name='userName' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>
                                    <FormItem>
                                        <Label htmlFor='description' labelName="Opis" className="registration-form__label" />
                                        <Field as='textarea'
                                            cols="30" 
                                            rows="5"
                                            id='description'
                                            type='text'
                                            name='description'
                                            value={currentUserDetails?.description}
                                        />
                                        <ErrorMessage name='description' render={error => <ErrorBox errorText={error} className="registration-form__error" />} />
                                    </FormItem>


                                    <InfoContainer>


                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Nick:</td>
                                                    <td>
                                                        <Input type='text' id='userName' name='userName' value={currentUserDetails?.userName} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Email:</td>
                                                    <td>
                                                        <Input type='email' id='email' name='email' value={currentUserDetails?.email} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Płeć:</td>
                                                    <td>
                                                        <Input id='start' aria-labelledby='gender' type='radio' name='gender' value='female' />
                                                        <Label htmlFor='start' labelName="Kobieta" />
                                                        <Input id='end' aria-labelledby='gender' type='radio' name='gender' value='male' />
                                                        <Label htmlFor='end' labelName="Mężczyzna" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Data urodzenia:</td>
                                                    <td>
                                                        <Input id='birthDate' type='date' name='birthDate' value={currentUserDetails?.birthDate.toString().substring(0,10)} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </InfoContainer>
                                    <ButtonsWrapper>
                                        <Button type='submit' variant="secondary" size="lg" text="Zapisz zmiany" />
                                    </ButtonsWrapper>
                                </Form>
                            </Formik>
                        </InfoFormsWrapper>
                    </FormsWrapper>
                </Wrapper>
            }
        </>
    )
}

export default EditProfileForms;