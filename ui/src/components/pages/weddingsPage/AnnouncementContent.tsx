import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { IIncomingWeddingDetailsReducers } from '../../../reducers/incomingWeddingDetailReducers'
import { ILoggedInReducer } from '../../../reducers/loggedInUserReducers';
import { ICurrentUserDetailsReducers } from '../../../reducers/currentUserDetailsReducers';
import AnnoucementCard from './AnnouncementCard';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';
import { Padding } from '../../../styledHelpers/Padding';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    overflow: auto;
    padding: ${Padding[24]} ${Padding[16]} ${Padding[8]} ${Padding[16]};

    h2 {
      font-size: ${FontSize[20]};
      text-align: center;
      color: ${Colors.red};
      margin-bottom: ${Margin[24]};
    }
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

interface Iweddings{
  firstName:string,
  description: string,
  date: Date,
  addressStreet: string,
  addressCity: string,
  addressPostCode: string,
  addressCountry: string,
  weddingNo:number
}

const Announcement = () => {
  const [allAnnouncement, setAllAnouncement] = useState<Iweddings[]>([]);
  const { IIncomingWeddingDetails } = useSelector<IState, IIncomingWeddingDetailsReducers& ILoggedInReducer>( state => ({
    ...state.incomingWeddingDetails,
    ...state.userData
  }));

  const wantedGender = (IIncomingWeddingDetails?.genders === 10) ? 20 : 10;
  console.log(IIncomingWeddingDetails);
  const usersParams = new URLSearchParams({
    maxDistance: '10',
    genders: wantedGender.toString()
  }).toString();

  const urlSelectedUsers = `https://localhost:5001/Users/GetIncomingWeddings?${usersParams}`;
 

  useEffect(() => {
    fetch(urlSelectedUsers, {
      method: 'GET',
      headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
    })
    .then(response => response.json())
    .then((data => {
        console.log(data);
        setAllAnouncement(data.items);
      }));
  }, []);

  return(
    <Wrapper>
    <h2>Nadchodzące wydarzenia</h2>
    <CardWrapper>
  {
    allAnnouncement?.map((items?) => {
      return(
        <AnnoucementCard key={items.weddingNo}
          date={items.date.toLocaleString().substring(0,10)}
          firstname={items.firstName}
          description={items.description}
          street={(items.addressStreet === null) ? 'Nie wiadomo gdzie ':items.addressStreet}
          city={(items.addressCity === null) ? 'Nie wiadomo gdzie ':items.addressCity}
          postCode={(items.addressPostCode === null) ? 'Nie wiadomo gdzie ':items.addressPostCode}
          country={(items.addressCountry === null) ? 'Nie wiadomo gdzie ':items.addressCountry}
        />);
  })
}
</CardWrapper>
</Wrapper>
  );
}
export default Announcement;