import { useEffect } from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IState } from '../../../reducers';
import { ILoggedInReducer } from '../../../reducers/loggedInUserReducers';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Padding } from '../../../styledHelpers/Padding';
import IconButtonGeneric from '../../common/IconButtonGeneric';

import CardItem from './leftBar/CardItem';


const Wrapper = styled.div`
    border: 1px solid red;
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    overflow: auto;
    flex-direction: column;
    padding: ${Padding[24]} ${Padding[16]} ${Padding[8]} ${Padding[16]};
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-space-around;
`;

const SearchWrapper = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const Search = styled.input`
  border: 1px solid ${Colors.gray02};
  border-radius: 4px;
  color: ${Colors.black};
  width: 100%;
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
`;
const SearchButtonContainer = styled.button`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;


interface ISingleUser {
  age: number
  description: string | null
  distance: number
  firstName: string
  gender: number
  heightUnit: string
  heightValue: number
  id: string
  weightUnit: string
  weightValue: number
  photos: [
    {
      fileNo: number,
      fileUrl: string
    }
  ]
};


const MainContent = () => {

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
      {console.log(userData)}
      <SearchWrapper>
        <Search type="search" placeholder="Znajdź wymarzoną partnerkę/partnera" />
        <SearchButtonContainer>
          <IconButtonGeneric className="md" src="./media/icons/search.svg" alt="search icon" />
        </SearchButtonContainer>
      </SearchWrapper>

      <CardWrapper>
        {
          allUsers?.map((user?) => {
            return (
              <CardItem key={user.id}
              image={(user.photos.length > 0 ) ? user.photos[0].fileUrl  :  "./photos/userAvatar.png" }
              name={user.firstName}
              description={(user.description === null) ? "Ten użytkownik jest nieśmiały. Jeszcze nic o sobie nie napisał." : user.description}
              />
              )
          })
        }
      </CardWrapper>
    </Wrapper>

  );

}

export default MainContent;