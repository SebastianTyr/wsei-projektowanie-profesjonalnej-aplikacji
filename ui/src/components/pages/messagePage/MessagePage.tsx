import { useEffect } from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { ILoggedInReducer } from '../../../reducers/loggedInUserReducers';
import Button from '../../common/Button';
import styled from 'styled-components';

import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';
import { Padding } from '../../../styledHelpers/Padding';

const Wrapper = styled.div`
    max-height: 100%;
    max-width: 100%;
`;

const UserList = styled.div`

    min-height: 100vh;
    max-width: 60vh;
`;

const UserMessage = styled.div`
    min-height: 100vh;
    max-width: 700vh;
    display: flex;
    flex-direction: row;
`;

const Message = styled.input`
    border: 1px solid ${Colors.gray02};
    border-radius: 4px;
    color: ${Colors.black};
    width: 60%;
    height: 32px;
    padding: ${Padding[4]} ${Padding[8]};
    text-transform: capitalize;
    font-family: "Roboto", sans-serif;
    font-size: ${FontSize[14]};
    &::placeholder {
        text-align: center;
        color: ${Colors.gray03};
        font-weight: 300;
    }
    margin-left: 100vh;
`;

const UserMessageWrapper = styled.div`
    max-height: 20vh;
    display: flex;
    flex-direction: column;
    border-bottom: 0.3vh solid red;
`;

const ImageBox = styled.div`
    height: 60%;
    width: 40%;
    display: flex;
    align-items: center;
    overflow: hidden;
    img {
        width: 20%;
        object-fit: cover;
    }
`;
const TextWrapper = styled.div`
    padding: 1rem;
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const NameBox = styled.span`
    font-size: ${FontSize[20]};
    color: ${Colors.navy};
    font-weight: 200;
    margin-bottom: ${Margin[8]};
`;

interface IToUserMessage {
    image: string;
    name: string;
};

interface ISingleUser {
    age: number
    description: string | null
    firstName: string
    id: string
    photos: [
      {
        fileNo: number,
        fileUrl: string
      }
    ]
  };

const ToUserMessage: FC<IToUserMessage> = (props: IToUserMessage) => {
    return (
        <UserMessageWrapper>
            <ImageBox>
                <img src={props.image} alt='user'></img>
                <TextWrapper>
                    <NameBox>{props.name}</NameBox>
                </TextWrapper>
            </ImageBox>
        </UserMessageWrapper>
    )
}

const MessagePage = () => {

    const [allUsers, setAllUsers] = useState<ISingleUser[]>([]);
    const { userData } = useSelector<IState, ILoggedInReducer>( state => ({
      ...state.userData
    }));
  
    const wantedGender = (userData?.gender === 10) ? 20 : 10;
  
    const usersParams = new URLSearchParams({
      maxDistance: '10',
      genders: wantedGender.toString()
    }).toString();
  
    const urlSelectedUsers = `https://localhost:5001/Users/Browse?${usersParams}`;
   
  
    useEffect(() => {
  
  
      fetch(urlSelectedUsers, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
  
      })
      .then(response => response.json())
      .then((data => {
          console.log(data);
          setAllUsers(data.items);
  
        }));
    }, []);
    
    console.log(allUsers[2]?.photos);

    return (
        <Wrapper>
            <UserList>
            {
                allUsers?.map((user?) => {
                    return (
                        <ToUserMessage key={user.id}
                        image={(user.photos.length > 0 ) ? user.photos[0].fileUrl  :  "./media/icons/avatar.svg" }
                        name={user.firstName}/>
                    )
                })
            }
            </UserList>
            <UserMessage>
                <Message type="message" placeholder="Napisz wiadomość..."/>
                <Button type="text" variant="primary" size="lg" text="Wyślij"></Button>
            </UserMessage>
        </Wrapper>
    )
};

export default MessagePage;