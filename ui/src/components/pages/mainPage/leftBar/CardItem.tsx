import { FC, useState } from 'react';
import styled from 'styled-components';
import IconButtonGeneric from '../../../common/IconButtonGeneric';

import { Colors } from '../../../../styledHelpers/Colors';
import { FontSize } from '../../../../styledHelpers/FontSize';
import { Gradient } from '../../../../styledHelpers/Gradient';
import { Margin } from '../../../../styledHelpers/Margin';
import { Border } from '../../../../styledHelpers/Border';


const Wrapper = styled.div`
    border: ${Border.red};
    position: relative;
    background-color: ${Colors.white};
    width: calc(33.333% - 2rem);
    height: 31.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    overflow: hidden;
    margin: ${Margin[16]};
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

const ImageBox = styled.div`
    height: 60%;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
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

const ButtonBox = styled.button`
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: ${Gradient.pinkOrange};
    border-radius: 50%;
    border: 0;
    position: absolute;
    top: 1rem;
    right: 1rem;
`;


interface ICardItem {
    image: string;
    name: string;
    description: string;
    id: string
}

const CardItem: FC<ICardItem> = (props: ICardItem) => {

    const [selectedUserId, setSelectedUserId] = useState({likedUserId: props.id});
    console.log(selectedUserId);

    const postHandler = () => {
        const urlAddLike = 'https://localhost:5001/Users/AddLike';
        fetch(urlAddLike, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(selectedUserId)
        })
        .then((response) => console.log(response));
    }

    return(
        <Wrapper>
            <ButtonBox onClick={postHandler}>
                <IconButtonGeneric className="lg" src="./media/icons/like.svg" alt="like icon" />
            </ButtonBox>
            <ImageBox>
                <img src={props.image} alt='user'></img>
            </ImageBox>
            <TextWrapper>
                <NameBox>{props.name}</NameBox>
                <DescriptionBox>{props.description}</DescriptionBox>
            </TextWrapper>
        </Wrapper>
    );
};

export default CardItem;