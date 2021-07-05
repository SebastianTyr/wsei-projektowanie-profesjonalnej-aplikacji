import { FC } from 'react';
import styled from 'styled-components';

import CardItem from './leftBar/CardItem';


const Wrapper = styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    width: 1200px;
    margin: 0 auto;
`;



const SearchWrapper = styled.div`
    width: 535px;
    height: 30px;
    margin: 1rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: solid 2px #D2D3D6;
  
`;

const SearchInput = styled.input`
    height: 100%;
    width: 500px;
    border: none;
    text-align: center;
    &:focus {
        outline: none;
    };
`;
const SearchSubmit = styled.input`
   height: 20px;
   padding-right: 5px;
   &:focus {
        outline: none;
    };
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-space-around;
`;



const MainContent: FC = () => {
    return (
        <Wrapper>
             <SearchWrapper>
                <SearchInput type='search' placeholder='Znajdź wymarzoną partnerkę/partnera'></SearchInput>
                <SearchSubmit type='image' alt='submit' src='./photos/search.png'></SearchSubmit>
            </SearchWrapper>
            <CardWrapper>
                <CardItem   image="./photos/userAvatar_2.jpg"
                            name="Aniela Kowalska"
                            description="Najlepsza towarzyszka na wesele"
                />
                <CardItem   image="./photos/userAvatar_2.jpg"
                            name="Jolanta Fajna"
                            description="Udana zabawa do rana"
                />
                <CardItem   image="./photos/userAvatar_2.jpg"
                            name="Jan Nowak"
                            description="Nie daj sie zmylić pozorom"
                />
                <CardItem   image="./photos/userAvatar_2.jpg"
                            name="Stanisław Polak"
                            description="Wiem co to tradycja"
                />
                <CardItem   image="./photos/userAvatar_2.jpg"
                            name="Jan Jan"
                            description="Kulturalny pan do zabawy"
                />
               
            </CardWrapper>
        </Wrapper>

    );

}

export default MainContent;