import { useState } from 'react';
import styled from 'styled-components';

import { FontSize } from '../../../styledHelpers/FontSize';
import Button from '../../common/Button';

import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { ILoggedInReducer } from '../../../reducers/loggedInUserReducers';
import { ICurrentUserDetailsReducers } from '../../../reducers/currentUserDetailsReducers';
import { Padding } from '../../../styledHelpers/Padding';
import { Gradient } from '../../../styledHelpers/Gradient';
import { Colors } from '../../../styledHelpers/Colors';
import { Border } from '../../../styledHelpers/Border';
import { Margin } from '../../../styledHelpers/Margin';
import EditProfileForms from '../../profileForms/EditProfileForms';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 76px);
    width: 100vw;
    background-image: ${Gradient.orangePink};
`
const WrapperContainer = styled.div`
    background-color: ${Colors.white};
    width: 80%;
    height: 90%;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    padding: 0 ${Padding[24]};
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`
const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    padding: ${Padding[40]};
    height: 100%;

    img { 
        height: 60%;
        border-radius: 1rem;
    }

    span {
        margin-top: ${Margin[24]};
    }
`
const MainContainer = styled.div`
    width: 60%;
    padding: ${Padding[40]} ${Padding[40]} ${Padding[40]} ${Padding[24]};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const MainContainerHeader = styled.div`
    width: 100%;
    height: calc(100% - 400px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const PersonInfo = styled.div`
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`
const Names = styled.p`
    color: ${Colors.navy};
    font-size: ${FontSize[50]};
    font-weight: 600;
`
const Description = styled.div`
    font-size: ${FontSize[18]};
    color: ${Colors.navy};
    font-weight: 500;
`
const MainContainerBox = styled.div`
    height: 400px;
`
const EditButtonBox = styled.span`
    height: 3.125rem;
    font-size: ${FontSize[24]};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: ${Margin[8]};
`;
const ButtonsBox = styled.div`
    position: relative;
    &:before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        bottom: 0;
        border-bottom: ${Border.navyXl};
    }
    
`
const ButtonAbout = styled.button`
    font-size: 1.13rem;
    color: ${Colors.navy};
    font-weight: 500;
    padding: ${Padding[16]} ${Padding[24]};
    border-radius: 4px 4px 0 0;
    &.active {
        position: relative;
        background-color: ${Colors.gray05};
        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 4px;
            bottom: 0;
            left: 0;
            border-bottom: ${Border.redXl};
        }
    }
`
const ButtonWeddings = styled.button`
    font-size: ${FontSize[18]};
    color: ${Colors.navy};
    font-weight: 500;
    padding: ${Padding[16]} ${Padding[24]};
    &.active {
        position: relative;
        background-color: ${Colors.gray05};
        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 4px;
            bottom: 0;
            left: 0;
            border-bottom: ${Border.redXl};
        }
    }
`
const ButtonContent = styled.div`
    padding: ${Padding[16]} 0;
`
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
`
const WeddingsContainer = styled.div`
    height: 100%;
    overflow: auto;
    ul {
        list-style-position: inside;
        list-style-type: square;
    }
`
const SingleWedding = styled.li`
    font-size: ${FontSize[18]};
    color: ${Colors.navy};
    font-weight: 400;
    margin-bottom: ${Margin[8]};
`

const DescriptionWrapper = styled.span`

`;

const ProfilePage = () => {

    const { userData, currentUserDetails } = useSelector<IState, ILoggedInReducer & ICurrentUserDetailsReducers>(state => ({
        ...state.userData,
        ...state.currentUserDetails
    }));
    const [isInfoVisible, setIsInfoVisible] = useState<boolean>(true);
    const [isWeddingsInfoVisible, setIsWeddingsInfoVisible] = useState<boolean>(false);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const editClickHandler = () => {
        setIsEdit(!isEdit);
    }

    const isEditFalseHandler = () => {
        setIsEdit(false);
    }
    const showInfo = () => {
        setIsInfoVisible(true);
        setIsWeddingsInfoVisible(false);
    }
    const showWeddings = () => {
        setIsWeddingsInfoVisible(true);
        setIsInfoVisible(false);
    }
    return (
        <Wrapper>
            {isEdit ? (
                <EditProfileForms  closeClick={isEditFalseHandler}/>
            ) : (
                <WrapperContainer>
                    <>
                        <ImageContainer>
                            <img alt="avatar" src={(currentUserDetails?.photos.length < 1) ? "./media/icons/avatar.svg" : currentUserDetails?.photos[0].photoUrl}></img>
                            {(currentUserDetails?.photos.length < 1) ?
                                <span>Pokaż się innym, kliknij "Edytuj" i dodaj zdjęcie</span>
                                : null
                            }
                        </ImageContainer>
                        <MainContainer>
                            <MainContainerHeader>
                                <EditButtonBox>
                                    <Button variant="primary" type="text" size="md" text="Edytuj" onClick={editClickHandler}></Button>
                                </EditButtonBox>
                                <Names>{currentUserDetails?.firstName} {currentUserDetails?.secondName}</Names>
                                <PersonInfo>
                                    <Description>
                                        {currentUserDetails?.description ? (
                                            <>{currentUserDetails?.description}</>
                                        ) : (
                                            <>Opis</>
                                        )}
                                    </Description>
                                </PersonInfo>
                            </MainContainerHeader>
                            <MainContainerBox>
                                <ButtonsBox>
                                    <ButtonAbout type="button" onClick={showInfo} className={isInfoVisible ? "active" : ""}> Informacje </ButtonAbout>
                                    <ButtonWeddings type="button" onClick={showWeddings} className={isWeddingsInfoVisible ? "active" : ""}> Wesela </ButtonWeddings>
                                </ButtonsBox>
                                <ButtonContent>
                                    {isInfoVisible ? (
                                        <InfoContainer>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Nick:</td>
                                                        <td>{currentUserDetails?.userName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email:</td>
                                                        <td>{currentUserDetails?.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Płeć:</td>
                                                        <td>{(currentUserDetails?.gender === 10 ? "mężczyzna" : "kobieta")}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Data urodzenia:</td>
                                                        <td>{currentUserDetails?.birthDate.toString().substring(0, 10)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </InfoContainer>
                                    ) : (
                                        <WeddingsContainer>
                                            <ul>
                                                <SingleWedding>Wesele w Szczebrzeszynie</SingleWedding>
                                            </ul>
                                        </WeddingsContainer>
                                    )}
                                </ButtonContent>
                            </MainContainerBox>
                        </MainContainer>

                    </>
                </WrapperContainer>
            )}
        </Wrapper>
    );
};

export default ProfilePage;