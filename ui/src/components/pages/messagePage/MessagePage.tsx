import React, { useEffect, useState } from "react";
import { IPair, IPairMessage } from "../../../entities/pair";
import styled from "styled-components";
import { Padding } from "../../../styledHelpers/Padding";
import { FontSize } from "../../../styledHelpers/FontSize";
import { Colors } from "../../../styledHelpers/Colors";
import { Margin } from "../../../styledHelpers/Margin";
import * as signalR from '@microsoft/signalr';
import { Border } from "../../../styledHelpers/Border";
import { Gradient } from "../../../styledHelpers/Gradient";
import Button from "../../common/Button";

const MainContainer = styled.div`
    display: flex;
    height: calc(100vh - 76px);
    justify-content: space-between;
    background-image: ${Gradient.orangePink};
`
const RightPanel = styled.div`
    padding: 4rem;
    display: flex;
    flex: 4;
    flex-direction: column;
    justify-content: space-between;
`
const LeftPanel = styled.div`
   margin: 4rem 0 4rem 4rem;
    flex: 1;
    overflow: auto;
    width: 100%;
    background-color: ${Colors.white};
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`
const Wrapper = styled.div`
border: 3px solid black;
    margin: 0 auto;
    height: 100%;
    margin-bottom: 2rem;
    overflow: auto;
    cursor: pointer;
    padding: ${Padding[24]} ${Padding[16]} ${Padding[8]} ${Padding[16]};
    width: 100%;
    background-color: ${Colors.white};
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

    h2 {
    font-size: ${FontSize[20]};
    text-align: center;
    color: ${Colors.red};
    margin-bottom: ${Margin[24]};
    }
`;

const YourMessage = styled.div`
width: max-content;
max-width: 30%;
padding: 1rem;
margin-bottom: 30px;
border-radius: 1rem;
box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
background-color: ${Colors.gray05};
border: 0.063rem solid #fd5068;

`
const IncomingMessage = styled.div`
width: max-content;
max-width: 30%;
margin-left: 8rem;
padding: 1rem;
margin-bottom: 30px;
border-radius: 1rem;
box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
background-color: ${Colors.gray05};
border: 0.063rem solid #ff7854;
`
const Message = styled.span`
align-items: center;
`
const User= styled.span`
font-size: x-small;
text-align: center;
`
const TextWrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`
const WrapperMessage = styled.div`
    justify-content: space-between;
    margin: 0 auto;
    padding: ${Padding[16]};
    width: 100%;
    background-color: ${Colors.white};
    display: flex;
    align-items: center;
    border-radius: 1rem;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

        label {
            white-space: nowrap;
            color: ${Colors.navy};
            font-size: ${FontSize[14]};
            font-weight: 600;
            text-transform: uppercase;
        }
        input {
            margin-right: 1rem;
            margin-left: 1rem;
            width: 100%;
        }
    `;
const MessagePage = () => {
    const [pairs, setPairs] = useState<IPair[]>([]);
    const [currentMessages, setCurrentMessages] = useState<IPairMessage[]>([]);
    let [currentPair, setCurrentPair] = useState<IPair>();
    const url = `https://localhost:5001/Pairs`;
    let messageInput = React.createRef<HTMLInputElement>();
    
    function setPair(pair: IPair) {
        setCurrentPair(pair);
        getPairMessages(pair);
    }
    function getPairMessages(pair: IPair) {
        console.log(currentPair);
        fetch(`${url}/${pair?.pairId}/messages`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
        })
        .then(response => response.json())
        .then((data: {items: IPairMessage[]}) => {
            setCurrentMessages(data.items.reverse());
            console.log(currentMessages);
        });
    }
    console.log(currentPair);
    function addMessageToCollection(message: IPairMessage) {
        console.log(message);
        setCurrentMessages(previousState => [...previousState, message]);
    }

    function sendMessageToPair() {
        fetch(`${url}/messages`, {
            method: 'POST',
            headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken'), "Content-Type": "application/json"},
            body: JSON.stringify({ pairId: currentPair?.pairId, toUserId: currentPair?.likedUserId, message: messageInput.current?.value })
        })
        .then(() => addMessageToCollection({fromUserId: "Ty", message: messageInput.current?.value} as IPairMessage));
    }

    useEffect(() => {
        const hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/pairMessages', {
            accessTokenFactory: () => String(sessionStorage.getItem('jwtToken'))}).build();
        hubConnection.start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log(err));

        hubConnection.on('messageArrived', (data: IPairMessage) => addMessageToCollection(data));

        fetch(url, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
        })
        .then(response => response.json())
        .then((data: {items: IPair[]}) => {
            console.log(data);
            setPairs(data.items);
            console.log(pairs)
        });
    }, [])

    return (
        <MainContainer>
            <LeftPanel className="left-panel">
                {
                pairs.map((pair) => { return (
                    <Wrapper onClick={() => setPair(pair)}>
                        <div>
                        Para z: {pair.likedUserFirstName}
                        </div>
                        <div>
                        Ostatnia wiadomość: {pair.lastMessage}
                        </div>
                        <hr></hr>
                    </Wrapper>
                )})
            }
            </LeftPanel>
            <RightPanel className="right-panel">
                <Wrapper>
                {currentMessages.map((message) => {
                    return (
                        (message.fromUserId==="Ty")?
                            <YourMessage>
                               <Message>{message.message}</Message>
                            </YourMessage>
                            :
                               <IncomingMessage>
                                   <Message>{message.message}
                                   </Message>
                                </IncomingMessage>
                            
                        )
                    })
                }
                </Wrapper>
                <WrapperMessage>
                    <label>Wpisz wiadomość: </label>
                    <input ref={messageInput} name="message" type="text"></input>
                    <Button variant="primary" type="text" size="md" text="Wyślij" onClick={sendMessageToPair}> </Button>
                </WrapperMessage>
            </RightPanel>
        </MainContainer>
    )
};

export default MessagePage;