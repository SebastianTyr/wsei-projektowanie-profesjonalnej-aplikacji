import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";


import { Colors } from "../../styledHelpers/Colors";
import { CreateAccountButton } from './common';



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

const CostumForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 20px;
    border-bottom: 1px solid ${Colors.gray03};

    label {
        font-size: 15px;
        padding: 10px 0 10px 10px;

    }

    input {
        font-size: 20px;
        border: none;
        

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
    background-color: ${Colors.red};
    color: ${Colors.white};

`;


interface IRegistrationData {
    userName: string,
    name: string,
    lastName: string,
    email: string,
    passowrd: string,
    confirmPassword: string,
    weight: null,
    height: null,
    gender: string,
    birthDate: Date,
}


const RegistrationForm: FC = () => {

    const [registrationData, setRegistrationData] = useState<IRegistrationData>({
        name: '',
        lastName: '',
        email: '',
        passowrd: '',
        confirmPassword: '',
        userName: '',
        weight: null,
        height: null,
        gender: '',
        birthDate: new Date(),

    });

    const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(registrationData);
    };

    return (
        <Wrapper>
            <HeaderWrapper>
                <h2>Utwórz Konto</h2>
            </HeaderWrapper>
            <CostumForm onSubmit={submitHandler}>
                <FormItem>
                    <label>Nazwa Użytkownika</label>
                    <input
                        type='text'
                        name='userName'
                        value={registrationData.userName}
                        onChange={textChangeHandler}
                    />
                </FormItem>
                <ItemsBox>
                    <FormItem style={{marginRight: "20px"}}>
                        <label>Imię</label>
                        <input
                            type='text'
                            name='name'
                            value={registrationData.name}
                            onChange={textChangeHandler}
                        />
                    </FormItem>
                    <FormItem>
                        <label>Nazwisko</label>
                        <input
                            type='text'
                            name='lastName'
                            value={registrationData.lastName}
                            onChange={textChangeHandler}
                        />
                    </FormItem>
                </ItemsBox>
                <FormItem>
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        value={registrationData.email}
                        onChange={textChangeHandler}
                    />
                </FormItem>
                <ItemsBox>
                    <FormItem style={{marginRight: "20px"}}>
                        <label>Płeć</label>
                        <div onChange={textChangeHandler}>
                            <input
                                type='radio'
                                name='gender'
                                value='female'
                            /> Kobieta
                            <input
                                type='radio'
                                name='gender'
                                value='male'
                            /> Mężczyzna
                        </div>
                    </FormItem>
                    <FormItem>
                        <label>Data urodzenia</label>
                        <input
                            type='date'
                            name='birthDate'
                            onChange={textChangeHandler}
                        />
                    </FormItem>
                </ItemsBox>
                <ItemsBox>
                    <FormItem style={{marginRight: "20px"}}>
                        <label>Hasło</label>
                        <input
                            type='text'
                            name='passowrd'
                            value={registrationData.passowrd}
                            onChange={textChangeHandler}
                        />
                    </FormItem>
                    <FormItem>
                        <label>Powtórz Hasło</label>
                        <input
                            type='text'
                            name='confirmPassword'
                            value={registrationData.confirmPassword}
                            onChange={textChangeHandler}
                        />
                    </FormItem>
                </ItemsBox>
                <FormItem>
                    <CreateButton type='submit'>Zarejestruj się</CreateButton>
                </FormItem>
            </CostumForm>
        </Wrapper>
    );
};

export default RegistrationForm;