import { File } from '@babel/types';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';


import Button from '../common/Button';


const Wrapper = styled.div`
    border: 1px solid red;
    margin: 20px 0 0 20px;
    width: 300px;
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
// label ostylowac, żeby wyglądał jak button - użytkownik intuicyjnie 
//powinien wiedzieć, że żeby dodać zdjęcie musi kliknąć w label
    label {
        margin: 10px 0;
    }

    input {
        margin: 10px 0;
        opacity: 0;
    }
`;

const PreviewWrapper = styled.div`

`;

const ImageForm = () => {


    const [isSelect, setIsSelect] = useState<boolean>(false);

    let selectedFile: any;

    const history = useHistory();

    const onChangeHandler = (event: any) => {

        setIsSelect(true);

        const curFile = event.target.files;

        if (!curFile)
            return;
        console.log(curFile[0]);

        if(curFile.length === 0)
            setIsSelect(false);

        
        selectedFile = curFile[0];
        console.log(selectedFile.name);
        
    };

    const fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', selectedFile);
        console.log(fd);
        fetch('https://localhost:5001/Users/UploadPhoto', {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer " + sessionStorage.getItem('jwtToken'),
                "Content-Type": "multipart/form-data"
            },
            body: fd
        }).then(response => console.log(response))
        .then(() => { history.push("/main") });

    
    };



    return (
        <Wrapper>
            <form>
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
                {!isSelect &&
                    <PreviewWrapper>
                        <p>Nie wybrałeś jeszcze zdjęcia</p>
                    </PreviewWrapper>
                }
                <div>
                    {/* <Button onClick={fileUploadHandler} type="submit" variant="secondary" size="lg" text="Dodaj zjdęcie" /> */}
                    <button onClick={fileUploadHandler}>Dodaj zdjęcie</button>
                </div> 
            </form>
        </Wrapper>
    )
};

export default ImageForm;