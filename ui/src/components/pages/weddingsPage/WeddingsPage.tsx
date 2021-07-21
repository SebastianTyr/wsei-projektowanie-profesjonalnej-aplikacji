import { FC,useState } from 'react';
import Button from '../../common/Button';
import styled from 'styled-components';
import IconButtonGeneric from '../../common/IconButtonGeneric';
import { Gradient } from '../../../styledHelpers/Gradient';
import Label from "../../common/Label";
import AnnouncementForm from "../../announcementForm/announcementForm";
import Announcement from './Announcement';

const ItemsBox = styled.div`
    display: flex;
`
const Custom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const FormItem = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 10px 0 20px 0;
`;
const ButtonWrapper = styled.button`
  width: 80px;
  height: 80px;
  margin: 10px 0 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${Gradient.pinkOrange};
  border-radius: 50%;
  position: relative;
  border: 0;
`;

const WeddingsPage: FC = () => {
    const [isForm, setIsForm] = useState<boolean>(false);
    const [isChoosed, setIsChoosed] = useState<boolean>(false);
    const FormHandler =()=> {
           setIsForm(true);
           setIsChoosed(true);
        };
    const LookingHandler = () => {
           setIsChoosed(true)
        };
    const MainHandler = () => {
        setIsForm(false);
        setIsChoosed(false);
    }
     
    return (
        <>{!isChoosed&&
        <Custom>
            <ItemsBox>
                <h1>Wybierz Jedno</h1>
            </ItemsBox> 
                <FormItem>
                <Label htmlFor='form'labelName='Dodaj Wydarzenie'/>
                <ButtonWrapper>
                    <button className="form" onClick={FormHandler}>
                        <IconButtonGeneric className="xxl" src="./media/icons/plus-solid.svg" alt="weddings icon" />
                    </button>
                </ButtonWrapper>
                </FormItem>
                <FormItem>
                <Button variant="primary" type="text" size="md" text="Szukaj wydarzenia" onClick={LookingHandler}/>
                </FormItem>
        </Custom>
        } 
        {isChoosed&&isForm&&
        <>
        <Custom>
        <AnnouncementForm/>
        <Button variant="primary" type="text" size="md" text="Powrót" onClick={MainHandler}/>
        </Custom>
        </>}
        {isChoosed&&!isForm&& 
        <>
        <Announcement/>
        <Button variant="primary" type="text" size="md" text="Powrót" onClick={MainHandler}/>
        </>}
        </>
        )
    }

export default WeddingsPage;