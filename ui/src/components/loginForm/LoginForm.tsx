import styled from "styled-components";
import { Formik, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import { Margin } from "../../styledHelpers/Margin";
import ErrorBox from "../common/ErrorBox";
import { useDispatch } from "react-redux";
import { getIsAuthInfo } from '../../actions/authActions';
type GetIsAuthInfo = ReturnType<typeof getIsAuthInfo>;

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

const LoginForm = () => {

    const initialValues: ILoginData = {
        email: '',
        password: ''
    }

    const dispatch = useDispatch();

    let history = useHistory();


    return (
        <Wrapper className="modal">
            <div className="modal__header">
                <h2>Zaloguj się</h2>
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    console.log(values)

                    const loginData = {
                        email: values.email,
                        password: values.password
                    };

                    console.log(loginData);

                    fetch('https://localhost:5001/Users/signIn', {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(loginData)
                    })
                        .then((response) => {
                            if (response.status === 200) {
                                dispatch<GetIsAuthInfo>(getIsAuthInfo(true));
                                return response.json();
                            } else {
                                alert("Upsss, upewnij się, że podałeś poprawny email i/lub poprawne hasło");
                            }
                        })
                        .then((data => {
                            console.log(data);
                            sessionStorage.setItem("jwtToken", data.jwtToken);
                        })).then(() => {history.push("/main")});
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