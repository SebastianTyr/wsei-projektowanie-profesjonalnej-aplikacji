import styled from "styled-components";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';


import { Colors } from "../../../styledHelpers/Colors";
import { CreateAccountButton } from '../common';



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

const CustomForm = styled.form`
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
        birthData: Yup.date().required("Proszę podać datę urodzenia"),
    });


    return (
        <Wrapper>

            <HeaderWrapper>
                <h2>Utwórz Konto</h2>
            </HeaderWrapper>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
            >
                {({ values, handleChange, handleSubmit }) => (

                    <CustomForm onSubmit={handleSubmit}>
                        <FormItem>
                            <label htmlFor='userName'>Nazwa Użytkownika</label>
                            <input
                                id='userName'
                                type='text'
                                name='userName'
                                value={values.userName}
                                onChange={handleChange}
                            />
                            <ErrorMessage name='userName' render={error => <ErrorBox>{error}</ErrorBox>} />
                        </FormItem>
                        <ItemsBox>
                            <FormItem style={{ marginRight: "20px" }}>
                                <label htmlFor='firstName'>Imię</label>
                                <input
                                    id='firstName'
                                    type='text'
                                    name='firstName'
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="firstName" render={error => <ErrorBox>{error}</ErrorBox>} />
                            </FormItem>
                            <FormItem>
                                <label htmlFor='lastName'>Nazwisko</label>
                                <input
                                    id="lastName"
                                    type='text'
                                    name='lastName'
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="lastName" render={error => <ErrorBox>{error}</ErrorBox>} />
                            </FormItem>
                        </ItemsBox>
                        <FormItem>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                type='email'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                            />
                            <ErrorMessage name="email" render={error => <ErrorBox>{error}</ErrorBox>} />
                        </FormItem>
                        <ItemsBox>
                            <FormItem style={{ marginRight: "20px" }}>
                                <label htmlFor='gender'>Płeć</label>
                                <div style={{ borderBottom: ` 1px solid ${Colors.gray03}` }}>
                                    <input
                                        id='gender'
                                        type='radio'
                                        name='gender'
                                        value='female'
                                        onChange={handleChange}
                                    /> Kobieta
                                    <input
                                        id='gender'
                                        type='radio'
                                        name='gender'
                                        value='male'
                                        onChange={handleChange}
                                    /> Mężczyzna
                                </div>
                                <ErrorMessage name="gender" render={error => <ErrorBox>{error}</ErrorBox>} />
                            </FormItem>
                            <FormItem>
                                <label htmlFor='birthDate'>Data urodzenia</label>
                                <input
                                    id='birthDate'
                                    type='date'
                                    name='birthDate'
                                    value={values.birthDate}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="birthDate" render={error => <ErrorBox>{error}</ErrorBox>} />
                            </FormItem>
                        </ItemsBox>
                        <ItemsBox>
                            <FormItem style={{ marginRight: "20px" }}>
                                <label htmlFor='password'>Hasło</label>
                                <input
                                    id='password'
                                    type='password'
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="password" render={error => <ErrorBox>{error}</ErrorBox>} />
                            </FormItem>
                            <FormItem>
                                <label htmlFor='confirmPassword'>Powtórz Hasło</label>
                                <input
                                    id='confirmPassword'
                                    type='password'
                                    name='confirmPassword'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="confirmPassword" render={error => <ErrorBox>{error}</ErrorBox>} />
                            </FormItem>
                        </ItemsBox>
                        <FormItem style={{ border: "none" }}>
                            <CreateButton type='submit'>Zarejestruj się</CreateButton>
                        </FormItem>
                    </CustomForm>
                )}
            </Formik>
        </Wrapper>
    );
};

export default RegistrationForm;