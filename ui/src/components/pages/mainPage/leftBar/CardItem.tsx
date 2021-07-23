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
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    overflow: hidden;
    margin: ${Margin[16]};
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

const ImageBox = styled.div`
    height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`;
const TextWrapper = styled.div`
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: hidden;
    max-height: 0;
    transition: all 0.5s ease-in-out;
    &.open {
    padding: 1rem;
      max-height: 100vh;
      transition: all 0.5s ease-in-out;
    }

`;
const InfoBox = styled.span`
    font-size: ${FontSize[26]};
    color: ${Colors.navy};
    font-weight: 700;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: rgba(255,255,255,0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
`;
const NameBox = styled.span`
    font-size: ${FontSize[26]};
    color: ${Colors.navy};
    font-weight: 700;
    width: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
`;
const DescriptionBox = styled.div`
    overflow: auto;
    line-height: 1.5;
    font-size: ${FontSize[14]};
`;

const ButtonBox = styled.button`
    z-index: 2;
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
const WeddingInfo = styled.button`
    font-size: ${FontSize[14]};
    color: ${Colors.navy};
`;
const WeddingHeader = styled.span`
    font-weight: 700;
`;
const WeddingDescription = styled.span`
    overflow: hidden;
`;
const NextWedding = styled.div`
    margin-top: ${Margin[8]};
    padding: 0 1rem 1rem 1rem;
    color: ${Colors.navy};
    width: 100%;
    display: flex;
    flex-direction: column;
`;
interface ICardItem {
    image: string;
    name: string;
    description: string;
    id: string;
    weddingDate: Date;
    weddingDescription: string | null
}

const CardItem: FC<ICardItem> = (props: ICardItem) => {

    const [selectedUserId, setSelectedUserId] = useState({ likedUserId: props.id });
    console.log(selectedUserId);
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [isLiked, setisLiked]= useState(false);
    const weddingDate = props.weddingDate?.toString().substring(0, 10);
    
    const openCard = () => {
        setIsCardOpen(!isCardOpen);
        
    }
    const liked = () => {
        setisLiked(true);
    }
    const postLikeHandler = () => {
        liked()
        const urlAddLike = 'https://localhost:5001/Users/AddLike';
        fetch(urlAddLike, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('jwtToken')
            },
            body: JSON.stringify(selectedUserId)
        })     
    };

    return (
        <>
        <Wrapper>
            <button type="button" onClick={openCard}>
                <ButtonBox onClick={postLikeHandler}>
                    <IconButtonGeneric className="lg" src={`${(isLiked===false)?"./media/icons/like.svg":"./media/icons/heart.svg"}`} alt="like icon" />
                </ButtonBox>
                <ImageBox>
                    <img src={props.image} alt='user'></img>
                    <InfoBox>
                        <NameBox>{props.name}</NameBox>
                        {props.weddingDescription && ( 
                            <WeddingInfo>Zbliża się wesele: {weddingDate}</WeddingInfo>
                        )} 
                    </InfoBox>
                </ImageBox>
                <TextWrapper className={`${isCardOpen && "open"}`}>
                    <DescriptionBox>{props.description}</DescriptionBox>
                {props.weddingDescription && (
                    <NextWedding>
                        <WeddingHeader>Wesele: {weddingDate} </WeddingHeader>
                        <WeddingDescription>{props.weddingDescription}</WeddingDescription>
                    </NextWedding>
                )}
                </TextWrapper>
            </button>
        </Wrapper>
        </>
    );
};

export default CardItem;