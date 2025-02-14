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
    width: 100%;
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
`;

interface Iweddings {
  firstName: string,
  description: string,
  date: Date,
  addressStreet: string,
  addressCity: string,
  addressPostCode: string,
  addressCountry: string,
  weddingNo: number,
  gender:number,
}

const Announcement = () => {
  const [allAnnouncement, setAllAnouncement] = useState<Iweddings[]>([]);
  const { currentUserDetails } = useSelector<IState, IIncomingWeddingDetailsReducers & ICurrentUserDetailsReducers>(state => ({
    ...state.incomingWeddingDetails,
    ...state.currentUserDetails
  }));

  const wantedGender = currentUserDetails?.wantedGender.toString();
  /*const usersParams = new URLSearchParams({
    maxDistance: '10',
    genders: wantedGender
  }).toString();*/

  // const urlSelectedUsers = `https://localhost:5001/Users/GetIncomingWeddings?${usersParams}`;
  const urlSelectedUsers = 'https://localhost:5001/Users/GetIncomingWeddings';


  useEffect(() => {
    fetch(urlSelectedUsers, {
      method: 'GET',
      headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
    })
      .then(response => response.json())
      .then((data => {
        setAllAnouncement(data.items);
      }));
  }, []);

  return(
    <Wrapper>
    <CardWrapper>
  {
    allAnnouncement?.map((items?) => {
      return(
        (currentUserDetails.gender===items.gender)?null:(
        <AnnoucementCard key={items.weddingNo}
          date={items.date.toLocaleString().substring(0,10)}
          firstname={items.firstName}
          description={items.description}
          street={(items.addressStreet === null) ? 'Brak danych ':items.addressStreet}
          city={(items.addressCity === null) ? 'Brak danych ':items.addressCity}
          postCode={(items.addressPostCode === null) ? 'Brak danych ':items.addressPostCode}
          country={(items.addressCountry === null) ? 'Brak danych ':items.addressCountry}
        />));
  })
}
</CardWrapper>
</Wrapper>
  );
}
export default Announcement;