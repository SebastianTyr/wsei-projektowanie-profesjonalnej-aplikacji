import { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Padding } from '../../../styledHelpers/Padding';
import IconButtonGeneric from '../../common/IconButtonGeneric';

import CardItem from './leftBar/CardItem';


const Wrapper = styled.div`
    border: 1px solid red;
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    overflow: auto;
    flex-direction: column;
    padding: ${Padding[24]} ${Padding[16]} ${Padding[8]} ${Padding[16]};
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-space-around;
`;

const SearchWrapper = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const Search = styled.input`
  border: 1px solid ${Colors.gray02};
  border-radius: 4px;
  color: ${Colors.black};
  width: 100%;
  height: 32px;
  padding: ${Padding[4]} ${Padding[8]};
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
  font-size: ${FontSize[14]};
  &::placeholder {
    text-align: center;
    color: ${Colors.gray03};
    font-weight: 300;
  }
`;
const SearchButtonContainer = styled.button`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContent: FC = () => {
    return (
        <Wrapper>
            <SearchWrapper>
                <Search type="search" placeholder="Znajdź wymarzoną partnerkę/partnera" />
                <SearchButtonContainer>
                    <IconButtonGeneric className="md" src="./media/icons/search.svg" alt="search icon"/>
                </SearchButtonContainer>
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