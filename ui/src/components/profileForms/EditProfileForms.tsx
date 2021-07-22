import styled from "styled-components";
import { Colors } from "../../styledHelpers/Colors";
import { FontSize } from "../../styledHelpers/FontSize";
import { Padding } from "../../styledHelpers/Padding";
import ImageForm from "./ImageForm";


const Wrapper = styled.div`
    background-color: ${Colors.white};
    width: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    padding: 0 ${Padding[8]};
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`

const CloseWrapper = styled.div`
border: 1px solid red;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const IconWrapper = styled.span`
    width: 30px;
    height: 100%;
    padding: 0 ${Padding[8]};

    img {
        width: 100%;
        height: 100%;
    }
`;

const HeaderWrapper = styled.div`
    text-align: center;
    font-weight: 700;
`;

const FormsWrapper = styled.div`
    display: flex;
`;

const InfoFormsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled.div`
border: 1px solid pink;
    display: flex;
    flex-direction: column;
    width: 40%;
    padding: ${Padding[40]};
    height: 100%;
`;

const PersonInfo = styled.div`
    height: 100%;
`;

const Names = styled.p`
    color: ${Colors.navy};
    font-size: ${FontSize[60]};
    font-weight: 600;
`;
const Description = styled.p`
    font-size: 1.13rem;
    color: ${Colors.navy};
    font-weight: 500;
`;

const InfoContainer = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        tr {
            &:nth-child(even) {
                background-color: ${Colors.gray05};
            }
            td {
                padding: ${Padding[16]};
                &:first-child {
                    font-size: ${FontSize[20]};
                    color: ${Colors.navy};
                    font-weight: 500;
                }
                &:last-child {
                    font-size: ${FontSize[18]};
                    color: ${Colors.red};
                    font-weight: 500;
                }
            }

        }
    }
`;

interface IEditProfileFormsProps {
    closeClick(): void,
}

const EditProfileForms = (props: IEditProfileFormsProps) => {
    return (
        <Wrapper>

            <CloseWrapper>
                <IconWrapper>
                    <button onClick={props.closeClick}>
                        <img src='./media/icons/close.svg'></img>
                    </button>
                </IconWrapper>
            </CloseWrapper>
            <HeaderWrapper>Edytuj Profil</HeaderWrapper>
            <FormsWrapper>
                <ImageContainer>
                    <ImageForm />
                </ImageContainer>
                <InfoFormsWrapper>

                    <PersonInfo>
                        <Names>Janusz Kowalski</Names>
                        <Description>Super towrzysz na wesele</Description>
                    </PersonInfo>
                    <InfoContainer>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Nick:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Imie:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Nazwisko:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Płeć:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Data urodzenia:</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </InfoContainer>
                </InfoFormsWrapper>
            </FormsWrapper>

        </Wrapper>
    )
}

export default EditProfileForms;