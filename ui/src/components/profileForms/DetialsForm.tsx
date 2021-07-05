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
    border: 1px solid green;
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

interface IDetailsData {
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

const DetailsForm = () => {

    const initialValues: IDetailsData = {
        height: {
            value: 0,
            unit: 'cm'
        },
        weight: {
            value: 0,
            unit: 'kg'
        },
        address: {
            street: '',
            city: '',
            postCode: '',
            country: ''
        },
        description: '',
        wantedGender: 0,
        coordinate: {
            longitude: 0,
            latitude: 0
        }
    }

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
                        </FormItem>
                        <FormItem>
                            <label htmlFor='weight_value'>Waga ( kg ):</label>
                            <Field
                                id='weight_value'
                                type='text'
                                name='weightValue'
                            />
                        </FormItem>
                    </ItemsBox>
                    <TitleWrapper>Powiedz nam, gdzie mieszkasz, a my powiem, kto mieszka w Twojej okolicy</TitleWrapper>
                    <ItemsBox>
                        <FormItem>
                            <label htmlFor='street'>Ulica:</label>
                            <Field
                                id='street'
                                type='text'
                                name='addres.street'
                            />
                        </FormItem>
                        <FormItem>
                            <label htmlFor='city'>Miasto:</label>
                            <Field
                                id='city'
                                type='text'
                                name='city'
                            />
                        </FormItem>
                    </ItemsBox>
                    <ItemsBox>
                        <FormItem>
                            <label htmlFor='postCode'>Kod pocztowy:</label>
                            <Field
                                id='postCode'
                                type='text'
                                name='postCode'
                            />
                        </FormItem>
                        <FormItem>
                            <label htmlFor='country'>Kraj:</label>
                            <Field
                                id='country'
                                type='text'
                                name='country'
                            />
                        </FormItem>
                    </ItemsBox>
                    <FormItem>
                        <label htmlFor='description'>Pozwól poznać się lepiej, napisz coś o sobie:</label>
                        <Field as='textarea'
                            id='description'
                            type='text'
                            name='description'
                        />
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