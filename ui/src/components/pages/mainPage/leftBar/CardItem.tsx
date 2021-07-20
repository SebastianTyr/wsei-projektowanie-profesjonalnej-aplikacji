import { FC } from 'react';
import styled from 'styled-components';

import { Colors } from '../../../../styledHelpers/Colors';

const Wrapper = styled.div`

    background-color: ${Colors.white};
    width: 280px;
    height: 220px;
    display: flex;
    align-items: center;
    border-radius: 3%;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    margin: 1rem;
`;

const ImageBox = styled.div`
    height: 100px;;
    width: auto;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 0 0.3rem;

    img {
        height: 100%;
        width: 100%;
    
    }
`;

const TextWrapper = styled.div`
    padding: 0.5rem;
    height: 100%;
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const NameBox = styled.span`
    font-size: 16px;
    font-weight: 700;
`;

const DescriptionBox = styled.span`
    font-size: 12px;

`;

const ButtonBox = styled.button` `;


interface ICardItem {
    image: string;
    name: string;
    description: string;
}

const CardItem: FC<ICardItem> = (props: ICardItem) => {
    return(
        <Wrapper>
            <ImageBox>
                <img src={props.image} alt='user'></img>
            </ImageBox>
            <TextWrapper>
                <NameBox>{props.name}</NameBox>
                <DescriptionBox>{props.description}</DescriptionBox>
                <ButtonBox type="button">Zobacz profil</ButtonBox>
            </TextWrapper>
        </Wrapper>
    );
};

export default CardItem;