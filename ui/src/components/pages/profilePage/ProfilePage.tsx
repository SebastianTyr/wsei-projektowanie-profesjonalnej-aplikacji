import { useState } from 'react';
import styled from 'styled-components';

import DetailsForm from '../../profileForms/DetialsForm';
import { FontSize } from '../../../styledHelpers/FontSize';
import Button from '../../common/Button';
import ImageForm from '../../profileForms/ImageForm';
import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { ILoggedInReducer } from '../../../reducers/loggedInUserReducers';
import { ICurrentUserDetailsReducers } from '../../../reducers/currentUserDetailsReducers';
import { Padding } from '../../../styledHelpers/Padding';
import { Gradient } from '../../../styledHelpers/Gradient';
import { Colors } from '../../../styledHelpers/Colors';

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
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    border-radius: 1rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`
const ImageContainer = styled.div`
    display: flex;
    width: 40%;
    padding: ${Padding[16]};
    height: 100%;
`
const MainContainer = styled.div`
    width: 60%;
    padding: ${Padding[16]};
    height: 100%;
`
const MainContainerHeader = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
`
const PersonInfo = styled.div`

`
const Names = styled.p`
    color: ${Colors.red};
    font-size: ${FontSize[24]};
    font-weight: 600;
`
const Ranking = styled.div`
    color: ${Colors.red};
    font-size: ${FontSize[24]};
`
const Description = styled.p`
    font-size: 1.13rem;
    color: ${Colors.navy};
    font-weight: 500;
`
const MainContainerBox = styled.div`
    height: 70%;
`
const EditButtonBox = styled.span`
    width: auto;
    height: 50px;
    font-size: ${FontSize[24]};
`;


const ProfilePage = () => {

    const { userData, currentUserDetails } = useSelector<IState, ILoggedInReducer & ICurrentUserDetailsReducers>( state => ({
        ...state.userData,
        ...state.currentUserDetails
      }));

    const [isEditDetails, setIsEditDeatils] = useState<boolean>(false);
    const editDetailsHandler = () => {
        setIsEditDeatils(!isEditDetails);
    }
    return (
       <Wrapper>
           <WrapperContainer>
            {isEditDetails ? (
                <DetailsForm />
            ) : (
                <>
                    <ImageContainer>
                        <ImageForm/>
                    </ImageContainer>
                    <MainContainer>
                        <MainContainerHeader>
                            <PersonInfo>
                                <Names>{currentUserDetails?.firstName} {currentUserDetails?.secondName}</Names>
                               <Description>Description{currentUserDetails?.description}</Description> 
                               <Ranking></Ranking>
                            </PersonInfo>
                            <EditButtonBox>
                                <Button variant="primary" type="text" size="md" text="Edytuj szczegóły" onClick={editDetailsHandler}></Button>
                            </EditButtonBox>
                        </MainContainerHeader>
                        <MainContainerBox>
                            About, Wesela
                        </MainContainerBox>
                    </MainContainer>

                </>
            )}
            </WrapperContainer>
        </Wrapper>
    );
};

export default ProfilePage;