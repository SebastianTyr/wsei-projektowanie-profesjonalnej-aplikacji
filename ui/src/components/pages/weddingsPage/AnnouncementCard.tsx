import { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';
import { Border } from '../../../styledHelpers/Border';


const Wrapper = styled.div`
    border: ${Border.red};
    position: relative;
    background-color: ${Colors.white};
    width: 33.333%;
    height: 31.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

const TextWrapper = styled.div`
    padding: 1rem;
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const NameBox = styled.span`
    font-size: ${FontSize[26]};
    color: ${Colors.navy};
    font-weight: 700;
    margin-bottom: ${Margin[8]};
`;
const DescriptionBox = styled.div`
    overflow: auto;
    font-size: ${FontSize[14]};
`;

const AddressWrapper = styled.div`
    display: flex;
    align-items: center;
`
const SingleItem = styled.div`
    width: 50%;
    margin-bottom: ${Margin[8]};
`;


interface IAnnouncementCard {
    date?: Date,
    street:string,
    city:string,
    postCode:string,
    country:string
    description: string
}

const CardItem: FC<IAnnouncementCard> = (props: IAnnouncementCard) => {
    return(
        <Wrapper>
            <TextWrapper>
                <NameBox>{props.date}</NameBox>
                <AddressWrapper>
                    <SingleItem>
                        <NameBox>{props.street}</NameBox>
                        <NameBox>{props.city}</NameBox>
                        <NameBox>{props.postCode}</NameBox>
                        <NameBox>{props.country}</NameBox>
                    </SingleItem>
                </AddressWrapper>
                <DescriptionBox>{props.description}</DescriptionBox>
            </TextWrapper>
        </Wrapper>
    );
};

export default CardItem;