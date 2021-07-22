import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import { Margin } from '../../styledHelpers/Margin';
import Button from '../common/Button';
import Label from '../common/Label';
import Input from '../common/Input';
import ErrorBox from "../common/ErrorBox";
import { Colors } from '../../styledHelpers/Colors';
import { FontSize } from '../../styledHelpers/FontSize';
import { Padding } from '../../styledHelpers/Padding';


const Wrapper = styled.div`
    .details-form__label {
        margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};  
    }
    .details-form__input {
        margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};  
    }
    .details-form__error {
        margin: 0 ${Margin[8]} ${Margin[8]} ${Margin[8]};  
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    h2 {
        width: 90%;
    }
`;

const IconWrapper = styled.span`
    width: 30px;
    height: 30px;
    padding: 0 ${Padding[8]};

    img {
        width: 100%;
        height: 100%;
    }
`;

const TitleWrapper = styled.span`
    display: block;
    font-weight: 600;
    color: ${Colors.navy};
    font-size: ${FontSize[18]};
    margin: 0 ${Margin[8]} ${Margin[16]} ${Margin[8]};  
`;
const CustomForm = styled(Form)`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;
const FormItemsContainer = styled.div`
    margin-left: -${Margin[8]};
    margin-right: -${Margin[8]};
`
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


interface IDetailsFormProps {
    closeClick(): void;
}

const DetailsForm = (props: IDetailsFormProps) => {


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
        <Wrapper className="modal">
            <HeaderWrapper className="modal__header">
                <h2>Podaj dodatkowe informacje i bądź bardziej widoczny dla innych użytkowników</h2>
                <IconWrapper>
                    <button onClick={props.closeClick}>
                        <img src='./media/icons/close.svg'></img>
                    </button>
                </IconWrapper>
            </HeaderWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => console.log(values)}
            >
                <CustomForm>
                    <FormItemsContainer>
                        <ItemsBox>
                            <FormItem>
                                <Label htmlFor='height_value' labelName="Wzrost (cm):" className="details-form__label" />
                                <Input id='height_value' type='text' name='heightValue' className="details-form__input" />
                                <ErrorMessage name='heightValue' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                            </FormItem>
                            <FormItem>
                                <Label htmlFor='weight_value' labelName="Waga (kg):" className="details-form__label" />
                                <Input id='weight_value' type='text' name='weightValue' className="details-form__input" />
                                <ErrorMessage name='weightValue' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                            </FormItem>
                        </ItemsBox>
                        <TitleWrapper>Powiedz nam, gdzie mieszkasz, a my powiem, kto mieszka w Twojej okolicy</TitleWrapper>
                        <ItemsBox>
                            <FormItem>
                                <Label htmlFor='street' labelName="Ulica:" className="details-form__label" />
                                <Input id='street' type='text' name='addresStreet' className="details-form__input" />
                                <ErrorMessage name='addresStreet' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                            </FormItem>
                            <FormItem>
                                <Label htmlFor='city' labelName="Miasto:" className="details-form__label" />
                                <Input id='city' type='text' name='addresCity' className="details-form__input" />
                                <ErrorMessage name='addresCity' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                            </FormItem>
                        </ItemsBox>
                        <ItemsBox>
                            <FormItem>
                                <Label htmlFor='postCode' labelName="Kod pocztowy:" className="details-form__label" />
                                <Input id='postCode' type='text' name='addresPostCode' className="details-form__input" />
                                <ErrorMessage name='addresPostCode' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                            </FormItem>
                            <FormItem>
                                <Label htmlFor='country' labelName="Kraj:" className="details-form__label" />
                                <Input id='country' type='text' name='addresCountry' className="details-form__input" />
                                <ErrorMessage name='addresCountry' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                            </FormItem>
                        </ItemsBox>
                        <FormItem>
                            <Label htmlFor='description' labelName="Pozwól poznać się lepiej, napisz coś o sobie:" className="details-form__label" />
                            <Field as='textarea'
                                cols="30"
                                rows="5"
                                id='description'
                                type='text'
                                name='description'
                                className="details-form__input"
                            />
                            <ErrorMessage name='description' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                        </FormItem>
                        <FormItem>
                            <Label htmlFor='wantedGender' labelName="Kogo poszukujesz:" className="details-form__label" />
                            <RadioGroup>
                                <Input id='start' aria-labelledby='wantedGender' type='radio' name='wantedGender' value='0' className="details-form__input" />
                                <Label htmlFor='start' labelName="Kobiety" className="details-form__label" />
                                <Input id='end' aria-labelledby='wantedGender' type='radio' name='wantedGender' value='1' className="details-form__input" />
                                <Label htmlFor='end' labelName="Mężczyzny" className="details-form__label" />
                            </RadioGroup>
                            <ErrorMessage name='wantedGender' render={error => <ErrorBox errorText={error} className="details-form__error" />} />
                        </FormItem>
                    </FormItemsContainer>
                    <ButtonWrapper>
                        <Button type='submit' variant="secondary" size="lg" text="Dodaj  informacje" />
                    </ButtonWrapper>
                </CustomForm>
            </Formik>
        </Wrapper>

    );
};


export default DetailsForm;