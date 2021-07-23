import styled from "styled-components";
import { useState } from 'react';
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router-dom';

import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import { Margin } from "../../styledHelpers/Margin";
import ErrorBox from "../common/ErrorBox";
import { useDispatch } from "react-redux";
import { getCurrentUserInfo } from '../../actions/loggedInUserActions';
import { useEffect } from "react";
type GetCurrentUserInfo = ReturnType<typeof getCurrentUserInfo>;

// import { getIsAuthInfo } from '../../actions/authActions';
// type GetIsAuthInfo = ReturnType<typeof getIsAuthInfo>;

const Wrapper = styled.div`
   .registration-form__label {
       margin-bottom: ${Margin[8]};
   }
   .registration-form__input {
       margin-bottom: ${Margin[8]};
   }
`;
const CustomForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;
const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;
`;
const ButtonWrapper = styled(FormItem)`
    border: none;
`;

interface ILoginData {
    email: string,
    password: string
}

interface ICurrentUser {
    email: string,
    firstName: string,
    id: string,
    secondName: string,
    userName: string,
    jwtToken: string,
    gender: number

}

const LoginForm = () => {

    const initialValues: ILoginData = {
        email: '',
        password: ''
    }

    const dispatch = useDispatch();

    let history = useHistory();

    const [currentUser, setCurrentUser] = useState<ICurrentUser>({
        email: '',
        firstName: '',
        id: '',
        secondName: '',
        userName: '',
        jwtToken: '',
        gender: 0
    });


    useEffect(() => {
        dispatch<GetCurrentUserInfo>(getCurrentUserInfo(
            {
                email: currentUser.email,
                firstName: currentUser.firstName,
                id: currentUser.id,
                secondName: currentUser.secondName,
                userName: currentUser.secondName,
                gender: currentUser.gender
            }
        ));
    }, [currentUser])

    return (
        <Wrapper className="modal">
            <div className="modal__header">
                <h2>Zaloguj się</h2>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    const loginData = {
                        email: values.email,
                        password: values.password
                    };

                    fetch('https://localhost:5001/Users/signIn', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginData)
                    })
                        .then((response) => {
                            if (response.status === 200) {

                                return response.json();
                            } else {
                                alert("Upsss, upewnij się, że podałeś poprawny email i/lub poprawne hasło");
                                window.location.href = 'http://localhost:3000/';
                            }
                        })
                        .then((data => {
                            sessionStorage.setItem("jwtToken", data.jwtToken);
                            setCurrentUser(data);
                        })).then(() => { history.push("/main") });
                }}
            >
                <CustomForm>
                    <FormItem>
                        <Label htmlFor='email' labelName="Email" className="registration-form__label" />
                        <Input id='email' type='email' name='email' className="registration-form__input" />
                        <ErrorMessage name="email" render={error => <ErrorBox errorText={error} />} />
                    </FormItem>
                    <FormItem>
                        <Label htmlFor='password' labelName="Hasło" className="registration-form__label" />
                        <Input id='password' type='password' name='password' className="registration-form__input" />
                        <ErrorMessage name="password" render={error => <ErrorBox errorText={error} />} />
                    </FormItem>
                    <ButtonWrapper>
                        <Button type='submit' variant="secondary" size="lg" text="Zaloguj się" />
                    </ButtonWrapper>
                </CustomForm>


            </Formik>
        </Wrapper>
    )
};

export default LoginForm;