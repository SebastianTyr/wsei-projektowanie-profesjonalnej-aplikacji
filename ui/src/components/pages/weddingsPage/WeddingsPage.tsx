import { FC, useState} from 'react';
import Button from '../../common/Button';
import styled from 'styled-components';
import IconButtonGeneric from '../../common/IconButtonGeneric';
import { Gradient } from '../../../styledHelpers/Gradient';
import AnnouncementForm from "../../announcementForm/announcementForm";
import Announcement from './AnnouncementContent';
import { FontSize } from '../../../styledHelpers/FontSize';
import { Margin } from '../../../styledHelpers/Margin';
import { Colors } from '../../../styledHelpers/Colors';


const Custom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    background-image: ${Gradient.orangePink};
`;
const ItemsBox = styled.div`
    display: flex;
    font-size: ${FontSize[28]};
    align-items: center;
    color: ${Colors.navy};
`
const FormItem = styled.div`
    display: flex;
    flex-direction: row;
`;
const ButtonWrapper = styled.button`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.navy};
  border-radius: 50%;
  position: relative;
  border: 0;
  margin-left: ${Margin[16]};
`;

const WeddingsPage: FC = () => {

    const [isForm, setIsForm] = useState<boolean>(false);
    const FormHandler = () => {
        setIsForm(true);
        
    };
    const MainHandler = () => {
        setIsForm(false); 
    }

    return (
        <Custom>
        {!isForm &&<>
                <ItemsBox>
                    <h1>Wesela</h1>
                    <ButtonWrapper>
                        <button className="form" onClick={FormHandler}>
                            <IconButtonGeneric className="xxl" src="./media/icons/plus-solid.svg" alt="weddings icon" />
                        </button>
                    </ButtonWrapper>
                </ItemsBox>
                
                    <Announcement />
              
                </>
        }
            {isForm && 
                   <>
                     <AnnouncementForm />
                     <Button variant="primary" type="text" size="md" text="Powrót" onClick={MainHandler} />
                    </>
                }         
        </Custom>  
    )
}
export default WeddingsPage;