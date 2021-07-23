import { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';
import { Border } from '../../../styledHelpers/Border';
import { Gradient } from '../../../styledHelpers/Gradient';



const Wrapper = styled.div`
    border: ${Border.red};
    position: relative;
    margin-bottom: ${Margin[24]};
    margin-left: ${Margin[16]};
    background-color: ${Colors.white};
    width: calc(33.333% - 2rem);
    height: 21.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: ${Colors.navy};
    border-radius: 1rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

const TextWrapper = styled.div`
    padding: 1rem;
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const HeaderBox = styled.p`
    font-size: ${FontSize[24]};
    color: ${Colors.navy};
    font-weight: 600;
`
const NameBox = styled.span`
    font-size: ${FontSize[14]};
    color: ${Colors.navy};
    font-weight: 700;
    margin-bottom: ${Margin[8]};
`;
const DescriptionBox = styled.div`
    margin-top: ${Margin[8]};
    overflow: auto;
    font-size: ${FontSize[14]};
    border: ${Colors.navy};
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    
`;

const AddressWrapper = styled.div`
width: 100%;
    display: flex;
    flex-direction:row;
    
`
const SingleItem = styled.div`
    width: 50%;
    margin-right: ${Margin[4]};
`;


interface IAnnouncementCard {
    date?: string,
    street:string,
    city:string,
    postCode:string,
    country:string,
    firstname: string,
    description: string
}

const CardItem: FC<IAnnouncementCard> = (props: IAnnouncementCard) => {
    return(
        <Wrapper>
            <TextWrapper>
                <HeaderBox>{props.firstname}</HeaderBox>
                </TextWrapper>
                <TextWrapper>
                <NameBox>{props.date}</NameBox>
                </TextWrapper>
                <NameBox>Adres</NameBox>
                    <AddressWrapper>
                        <SingleItem><NameBox>{props.street}</NameBox></SingleItem>
                        <SingleItem><NameBox>{props.city}</NameBox></SingleItem>
                        <SingleItem><NameBox>{props.postCode}</NameBox></SingleItem>
                        <SingleItem><NameBox>{props.country}</NameBox></SingleItem>
                </AddressWrapper>
                <DescriptionBox>{props.description}</DescriptionBox>
        </Wrapper>
    );
};

export default CardItem;