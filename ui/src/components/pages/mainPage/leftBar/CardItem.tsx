import { FC } from 'react';
import styled from 'styled-components';
import IconButtonGeneric from '../../../common/IconButtonGeneric';

import { Colors } from '../../../../styledHelpers/Colors';
import { FontSize } from '../../../../styledHelpers/FontSize';
import { Gradient } from '../../../../styledHelpers/Gradient';
import { Margin } from '../../../../styledHelpers/Margin';


const Wrapper = styled.div`
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

const ImageBox = styled.div`
    height: 60%;
    width: auto;
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
}

const CardItem: FC<ICardItem> = (props: ICardItem) => {
    return(
        <Wrapper>
            <ButtonBox>
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