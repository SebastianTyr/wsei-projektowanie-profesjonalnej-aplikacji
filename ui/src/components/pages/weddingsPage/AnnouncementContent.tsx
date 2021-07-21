import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../../reducers';
import { IIncomingWeddingDetailsReducers } from '../../../reducers/incomingWeddingDetailReducers'
import styled from 'styled-components';
import AnnoucementCard from './AnnouncementCard';
import { useDispatch } from 'react-redux';



const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-space-around;
`;

interface Iweddings{
  firstName:string,
  description: string,
  date: Date,
  addressStreet: string,
  addressCity: string,
  addressPostCode: string,
  addressCountry: string,
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
  <>
  <h1>witaj </h1>
  <h2>Nadchodzące wydarzenia</h2>
<CardWrapper>
  {allAnnouncement?.map((props?) => {
    <AnnoucementCard
  description={props.description}
  street={props.addressStreet}
  city={props.addressCity}
  postCode={props.addressPostCode}
  country={props.addressCountry}
  />


  })
  
}
  </CardWrapper>
  </>);
}
export default Announcement;