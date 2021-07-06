import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Colors } from '../../styledHelpers/Colors';
import { Margin } from '../../styledHelpers/Margin';
import Button from '../common/Button';



const Wrapper = styled.div`
    width: 100%;

`;

const HeaderWrapper = styled.h2`
    width: auto;
    text-align: center;
  
`;

const TitleWrapper = styled.span`
    display: block;
`;

const CustomForm = styled(Form)`
    max-width: 1200px;
    margin: 0 auto;
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

    input, textarea {
        font-size: 20px;
        border: none;
        border-bottom: 1px solid ${Colors.gray03};
        margin-right: ${Margin[16]};
        

        &:focus {
            background-color: ${Colors.gray01};

        }

    }

    div {
        display: felx;
        justify-content: space-between;

    }
`;

const ButtonWrapper = styled(FormItem)`
    border: none;
`;

const ItemsBox = styled.div`
    display: flex;

`;

const ErrorBox = styled.div`
    font-size: 14px;
    color: ${Colors.redError};
`;

interface IDetailsDataFromDB {
    height: {
        value: number,
        unit: string
    },
    weight: {
        value: number,
        unit: string
    },
    address: {
        street: string,
        city: string,
        postCode: string,
        country: string
    },
    description: string,
    wantedGender: number,
    coordinate: {
        longitude: number,
        latitude: number
    }
};

interface IDetailsDataFromForm {
    heightValue: number,
    weightValue: number,
    addresStreet: string,
    addresCity: string,
    addresPostCode: string,
    addresCountry: string,
    description: string,
    wantedGender: number
};



const DetailsForm = () => {

    // const initialValues: IDetailsDataFromDB = {
    //     height: {
    //         value: 0,
    //         unit: 'cm'
    //     },
    //     weight: {
    //         value: 0,
    //         unit: 'kg'
    //     },
    //     address: {
    //         street: '',
    //         city: '',
    //         postCode: '',
    //         country: ''
    //     },
    //     description: '',
    //     wantedGender: 0,
    //     coordinate: {
    //         longitude: 0,
    //         latitude: 0
    //     }
    // }

    const initialValues: IDetailsDataFromForm = {
        heightValue: 0,
        weightValue: 0,
        addresStreet: '',
        addresCity: '',
        addresPostCode: '',
        addresCountry: '',
        description: '',
        wantedGender: 0
    };

    const validationSchema = Yup.object({
        heightValue: Yup.number().positive().required("Proszę podać wzrost"),
        weightValue: Yup.number().positive().required("Proszę podać wagę"),
        addresStreet: Yup.string().required("Prosze podać nazwę ulicy i numer"),
        addresCity: Yup.string().required("Proszę podać miasto"),
        addresPostCode: Yup.string().required("Proszę podać kod pocztowy"),
        addresCountry: Yup.string().required("Proszę podać państwo"),
        description: Yup.string().max(500, "Max 500 znaków").required("Prosze napisać o sobie"),
        wantedGender: Yup.number().required("Proszę wskazać kogo poszukujesz")
    })

    return (
        <Wrapper>
            <HeaderWrapper>Podaj dodatkowe informacje, bądź bardziej widoczny dla innych użytkowników</HeaderWrapper>

            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log(values)}
            >
                <CustomForm>
                    <ItemsBox>
                        <FormItem>
                            <label htmlFor='height_value'>Wzrost ( cm ):</label>
                            <Field
                                id='height_value'
                                type='text'
                                name='heightValue'
                            />
                            <ErrorMessage name='heightValue' render={error => <ErrorBox> {error}</ErrorBox>} />
                        </FormItem>
                        <FormItem>
                            <label htmlFor='weight_value'>Waga ( kg ):</label>
                            <Field
                                id='weight_value'
                                type='text'
                                name='weightValue'
                            />
                            <ErrorMessage name='weightValue' render={error => <ErrorBox> {error}</ErrorBox>} />
                        </FormItem>
                    </ItemsBox>
                    <TitleWrapper>Powiedz nam, gdzie mieszkasz, a my powiem, kto mieszka w Twojej okolicy</TitleWrapper>
                    <ItemsBox>
                        <FormItem>
                            <label htmlFor='street'>Ulica:</label>
                            <Field
                                id='street'
                                type='text'
                                name='addresStreet'
                            />
                            <ErrorMessage name='addresStreet' render={error => <ErrorBox> {error}</ErrorBox>} />
                        </FormItem>
                        <FormItem>
                            <label htmlFor='city'>Miasto:</label>
                            <Field
                                id='city'
                                type='text'
                                name='addresCity'
                            />
                            <ErrorMessage name='addresCity' render={error => <ErrorBox> {error}</ErrorBox>} />
                        </FormItem>
                    </ItemsBox>
                    <ItemsBox>
                        <FormItem>
                            <label htmlFor='postCode'>Kod pocztowy:</label>
                            <Field
                                id='postCode'
                                type='text'
                                name='addresPostCode'
                            />
                            <ErrorMessage name='addresPostCode' render={error => <ErrorBox> {error}</ErrorBox>} />
                        </FormItem>
                        <FormItem>
                            <label htmlFor='country'>Kraj:</label>
                            <Field
                                id='country'
                                type='text'
                                name='addresCountry'
                            />
                            <ErrorMessage name='addresCountry' render={error => <ErrorBox> {error}</ErrorBox>} />
                        </FormItem>
                    </ItemsBox>
                    <FormItem>
                        <label htmlFor='description'>Pozwól poznać się lepiej, napisz coś o sobie:</label>
                        <Field as='textarea'
                            id='description'
                            type='text'
                            name='description'
                        />
                        <ErrorMessage name='description' render={error => <ErrorBox> {error}</ErrorBox>} />
                    </FormItem>
                    <FormItem>
                        <label htmlFor='wantedGender'>Kogo poszukujesz:</label>
                        <div>
                            <Field
                                id='start'
                                aria-labelledby='wantedGender'
                                type='radio'
                                name='wantedGender'
                                value='0'
                            /> Kobiety
                            <Field
                                id='end'
                                aria-labelledby='wantedGender'
                                type='radio'
                                name='wantedGender'
                                value='1'
                            /> Mężczyzny
                        </div>
                        <ErrorMessage name='wantedGender' render={error => <ErrorBox> {error}</ErrorBox>} />
                    </FormItem>
                    <ButtonWrapper>
                        <Button type='submit' variant="secondary" size="lg" text="Dodaj  informacje" />
                    </ButtonWrapper>
                </CustomForm>
            </Formik>
        </Wrapper>


    );
};


export default DetailsForm;