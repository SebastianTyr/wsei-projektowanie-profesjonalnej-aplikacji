
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Border } from '../../styledHelpers/Border';
import { Colors } from '../../styledHelpers/Colors';
import { Gradient } from '../../styledHelpers/Gradient';
import { Margin } from '../../styledHelpers/Margin';



const Wrapper = styled.div`
    border: ${Border.red};
    border-radius: 1rem;
    width: 100%;
    height: 60%;
    margin-bottom: 1rem;
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;

    label {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${Colors.white};
        background-image: ${Gradient.orangePink};
        border-radius: 3rem;
        min-width: 6rem;
        height: 3rem;  
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.85rem;
        &:hover {
            background-image: ${Gradient.pinkOrange};
        }
    }

    input {
        opacity: 0;
    }
`;

const ButtonDisabled = styled.button`
    color: ${Colors.red};
        border: ${Border.red};
        background-color: ${Colors.white};
        border-radius: 0.6rem;
        background-image: none;
        min-width: 6rem;
        height: 3rem; 
`;



const ButtonActive = styled.button`
        color: ${Colors.white};
        background-image: ${Gradient.orangePink};
        border-radius: 3rem;
        min-width: 6rem;
        height: 3rem; 
        &:hover {
            background-image: ${Gradient.pinkOrange};
        }
        
    `;

const LabelDisabeled = styled.label`
        color: ${Colors.red};
        border: ${Border.red};
        background-color: ${Colors.white};
        border-radius: 0.6rem;
        background-image: none;
        min-width: 6rem;
        height: 3rem; `;


const ButtonsWrapper = styled.div``;

const PreviewWrapper = styled.div`
`;



const ImageForm = () => {
    const selectedFile = React.useRef<any>(null);
    const [isSelect, setIsSelect] = useState<boolean>(false);

    const history = useHistory();

    const onChangeHandler = (event: any) => {

        setIsSelect(true);

        const curFile = event.target.files;

        if (!curFile)
            return;
        console.log(curFile[0]);

        if (curFile.length === 0)
            setIsSelect(false);

        selectedFile.current = curFile;
    };

    const fileUploadHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(selectedFile)
        event.preventDefault();

        const fd = new FormData();
        Array.from(selectedFile.current).forEach((file) => fd.append("file", file as Blob))
        fetch('https://localhost:5001/Users/UploadPhoto', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('jwtToken'),
                "accept": "*/*"
            },
            body: fd
        }).then(response => console.log(response))
            .then(() => { history.push("/main") });
    };


    return (
        <Wrapper>
            <form>
                {!isSelect ?
                    <>
                        <ItemWrapper>
                            <label htmlFor='image'>Wybierz zdjęcie:</label>
                            <input id='image'
                                type='file'
                                name='image'
                                accept='.jpg, .jpeg, .png'
                                multiple={false}
                                onChange={onChangeHandler}
                            />
                        </ItemWrapper>
                        <PreviewWrapper>
                            <p>Nie wybrałeś jeszcze zdjęcia</p>
                        </PreviewWrapper>
                        <div>
                            <ButtonDisabled disabled onClick={fileUploadHandler}>Dodaj zdjęcie</ButtonDisabled>
                        </div>
                    </>
                    :
                    <>
                        <ItemWrapper>
                            <LabelDisabeled htmlFor='image'>Wybierz zdjęcie:</LabelDisabeled>
                            <input id='image'
                                type='file'
                                name='image'
                                accept='.jpg, .jpeg, .png'
                                multiple={false}
                                onChange={onChangeHandler}
                            />
                        </ItemWrapper>
                        <div>
                            <ButtonActive onClick={fileUploadHandler}> Dodaj zdjęcie</ButtonActive>
                        </div>
                    </>
                }
            </form>
        </Wrapper>
    )
};

export default ImageForm;