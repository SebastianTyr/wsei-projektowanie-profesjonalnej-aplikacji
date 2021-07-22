import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";

import { Colors } from "../../styledHelpers/Colors";
import { FontSize } from "../../styledHelpers/FontSize";
import { Padding } from "../../styledHelpers/Padding";
import ImageForm from "./ImageForm";
import Input from "../common/Input";
import Label from "../common/Label";


const Wrapper = styled.div`
    background-color: ${Colors.white};
    width: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 0 ${Padding[8]};
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`

const CloseWrapper = styled.div`
border: 1px solid red;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
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

const HeaderWrapper = styled.div`
    text-align: center;
    font-weight: 700;
`;

const FormsWrapper = styled.div`
    display: flex;
`;

const InfoFormsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled.div`
border: 1px solid pink;
    display: flex;
    flex-direction: column;
    width: 40%;
    padding: ${Padding[40]};
    height: 100%;
`;

const PersonInfo = styled.div`
    height: 100%;
`;

const Names = styled.p`
    color: ${Colors.navy};
    font-size: ${FontSize[60]};
    font-weight: 600;
`;
const Description = styled.p`
    font-size: 1.13rem;
    color: ${Colors.navy};
    font-weight: 500;
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
                }
            }

        }
    }
`;

interface IEditProfileFormsProps {
    closeClick(): void,
}

const EditProfileForms = (props: IEditProfileFormsProps) => {
    return (
        <Wrapper>

            <CloseWrapper>
                <IconWrapper>
                    <button onClick={props.closeClick}>
                        <img src='./media/icons/close.svg'></img>
                    </button>
                </IconWrapper>
            </CloseWrapper>
            <HeaderWrapper>
                <button>Zapisz zmiany </button>
            </HeaderWrapper>
            <FormsWrapper>
                <ImageContainer>
                    <ImageForm />
                </ImageContainer>
                <InfoFormsWrapper>
                    <Formik
                        initialValues={{ init: 'hej' }}
                        onSubmit={values => console.log(values)}
                    >
                        <Form>


                            <PersonInfo>
                                <Names>
                                    <Input type='text' id='firstName' name='fristName' value='Imię' />
                                    <Input type='text' id='secondName' name='secondName' value='Nazwisko' />
                                </Names>
                                <Description>
                                    <Input type='textarea' id='description' name='description' value='description' />
                                </Description>
                            </PersonInfo>

                            <InfoContainer>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Nick:</td>
                                            <td>
                                                <Input type='text' id='userName' name='userName' value='nazwa użytkownika' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>
                                                <Input type='email' id='email' name='email' value='email' />
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
                                                <Input id='birthDate' type='date' name='birthDate' value='' />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </InfoContainer>
                        </Form>
                    </Formik>
                </InfoFormsWrapper>
            </FormsWrapper>

        </Wrapper>
    )
}

export default EditProfileForms;