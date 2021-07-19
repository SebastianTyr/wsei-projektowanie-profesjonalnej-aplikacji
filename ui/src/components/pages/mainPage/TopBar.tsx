import { FC, useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import { Colors } from '../../../styledHelpers/Colors';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';
import IconButtonGeneric from '../../common/IconButtonGeneric';
import { Gradient } from '../../../styledHelpers/Gradient';
import { Border } from '../../../styledHelpers/Border';
import { IState } from '../../../reducers';
import { ILoggedInReducer } from '../../../reducers/loggedInUserReducers';
import { useSelector } from 'react-redux';
import { boolean } from 'yup/lib/locale';


const Wrapper = styled.div`
    background: ${Colors.white};
    padding: 0.5rem 1rem;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    min-height: 76px;
`;

const LogoContainer = styled.div`
    display: block;
    width: 9.5rem;
    height: 3.75rem;
    margin-right: 0.5rem;
`
const Logo = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("./media/icons/logo.png");
    background-repeat: no-repeat;
    background-size: cover;
`
const PersonNameContainer = styled.div`
    display: block;
    font-size: ${FontSize[18]};
    color: ${Colors.navy};
    font-weight: 600;
    margin-right: ${Margin[16]};

    span {
        color: ${Colors.red};
        font-size: ${FontSize[24]};
    }
`;
const LeftContainer = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
`;
const IconsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 2;
`;
const Messages = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${Margin[8]};
  background-image: ${Gradient.orangePink};
  border-radius: 50%;
  position: relative;
  border: 0;
  margin-right: ${Margin[8]};
`;
const Badge = styled.span`
  border-radius: 16px;
  background-color: ${Colors.white};;
  position: absolute;
  top: 0;
  right: -2px;
  height: 12px;
  min-width: 18px;
  color: ${Colors.red};
  border: ${Border.red};
  font-size: ${FontSize[8]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Profile = styled.button`
  width: 40px;
  height: 40px;
  margin-right: ${Margin[8]};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${Gradient.orangePink};
  border-radius: 50%;
  position: relative;
  border: 0;
`;
const Logout = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${Gradient.pinkOrange};
  border-radius: 50%;
  position: relative;
`;
const Weddings = styled.button`
  width: 40px;
  height: 40px;
  margin-right: ${Margin[8]};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${Gradient.pinkOrange};
  border-radius: 50%;
  position: relative;
  border: 0;
`;

interface ITopBarProps {
    loggedOut(): void;
}

const TopBar: FC<ITopBarProps> = (props) => {


    const { userData } = useSelector<IState, ILoggedInReducer>(state => ({
        ...state.userData
    }));

    return (

            <Wrapper>
                <LeftContainer>
                    <Link to="/main">
                        <LogoContainer>
                            <Logo />
                        </LogoContainer>
                    </Link>
                </LeftContainer>
                <IconsSection>
                    <PersonNameContainer>Cześć, <span>{userData?.firstName} </span>!</PersonNameContainer>
                    <Link to="/weddings">
                        <Weddings>
                            <IconButtonGeneric className="md" src="./media/icons/weddings.svg" alt="weddings icon" />
                        </Weddings>
                    </Link>
                    <Messages>
                        <IconButtonGeneric className="md" src="./media/icons/comments.svg" alt="messages icon" />
                        <Badge> 1 </Badge>
                    </Messages>
                    <Link to="/profile">
                        <Profile>
                            <IconButtonGeneric className="md" src="./media/icons/profile.svg" alt="profile icon" />
                        </Profile>
                    </Link>
                    <Link to='/'>
                        <Logout type='button' onClick={props.loggedOut}>
                            <IconButtonGeneric className="md" src="./media/icons/logout.svg" alt="logout icon" />
                        </Logout>
                    </Link>
                </IconsSection>
            </Wrapper>
    );
}

export default TopBar;