import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { IIncomingWeddingDetailsReducers } from '../../../reducers/incomingWeddingDetailReducers'
import AnnoucementCard from './AnnouncementCard';
import styled from 'styled-components';

const CardWrapper = styled.div`
    align-items: center;  
    display: flex;
    flex-direction: column;
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
  const { IIncomingWeddingDetails } = useSelector<IState, IIncomingWeddingDetailsReducers>( state => ({
    ...state.incomingWeddingDetails
  }));

  const wantedGender = (IIncomingWeddingDetails?.genders === 10) ? 20 : 10;

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
    <CardWrapper>
  <h2>Nadchodzące wydarzenia</h2>
  {
    allAnnouncement?.map((props?) => {
      return(
        <AnnoucementCard key={props.weddingNo}
          date={props.date.toLocaleString().substring(0,10)}
          firstname={props.firstName}
          description={props.description}
          street={(props.addressStreet === null) ? 'Nie wiadomo gdzie ':props.addressStreet}
          city={(props.addressCity === null) ? 'Nie wiadomo gdzie ':props.addressCity}
          postCode={(props.addressPostCode === null) ? 'Nie wiadomo gdzie ':props.addressPostCode}
          country={(props.addressCountry === null) ? 'Nie wiadomo gdzie ':props.addressCountry}
        />);
  })
}
</CardWrapper>
  );
}
export default Announcement;