
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';




const Wrapper = styled.div`
    border: 1px solid red;
    margin: 20px 0 0 20px;
    width: 300px;
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;

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
    const selectedFile = React.useRef<any>(null);
    const [isSelect, setIsSelect] = useState<boolean>(false);

    const history = useHistory();

    const onChangeHandler = (event: any) => {

        setIsSelect(true);

        const curFile = event.target.files;

        if (!curFile)
            return;
        console.log(curFile[0]);

        if(curFile.length === 0)
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
                    <button onClick={fileUploadHandler}>Dodaj zdjęcie</button>
                </div> 
            </form>
        </Wrapper>
    )
};

export default ImageForm;