import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import styled from "styled-components";
import * as signalR from '@microsoft/signalr';

import { IPair, IPairMessage } from "../../../entities/pair";
import { Padding } from "../../../styledHelpers/Padding";
import { FontSize } from "../../../styledHelpers/FontSize";
import { Colors } from "../../../styledHelpers/Colors";
import { Margin } from "../../../styledHelpers/Margin";


const Wrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    overflow: auto;
    cursor: pointer;
    padding: ${Padding[24]} ${Padding[16]} ${Padding[8]} ${Padding[16]};

    h2 {
      font-size: ${FontSize[20]};
      text-align: center;
      color: ${Colors.red};
      margin-bottom: ${Margin[24]};
    }
`;

const MessagePage = () => {

    const [pairs, setPairs] = useState<IPair[]>([]);
    const [currentMessages, setCurrentMessages] = useState<IPairMessage[]>([]);
    let [currentPair, setCurrentPair] = useState<IPair>();
    // const url = `https://localhost:5001/Pairs`;
    const url ='https://localhost:5001/Pairs'

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
            .then((data: { items: IPairMessage[] }) => {
                setCurrentMessages(data.items.reverse());
                console.log(currentMessages);
            });
    }

    function addMessageToCollection(message: IPairMessage) {
        console.log(message);
        setCurrentMessages(previousState => [...previousState, message]);
    }



    useEffect(() => {
        const hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/pairMessages', {
            accessTokenFactory: () => String(sessionStorage.getItem('jwtToken'))
        }).build();
        hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log(err));

        hubConnection.on('messageArrived', (data: IPairMessage) => addMessageToCollection(data));

        fetch(url, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + sessionStorage.getItem('jwtToken') }
        })
            .then(response => response.json())
            .then((data: { items: IPair[] }) => {
                console.log(data);
                setPairs(data.items);
                console.log(pairs)
            });


        getPairMessages(pairs)

    }, [])

    return (
        <>
            <div className="left-panel"> Lewy panel
                {
                    pairs.map((pair) => {
                        return (
                            <Wrapper onClick={() => setPair(pair)}>
                                <div>
                                    Para z: {pair.likedUserFirstName}
                                </div>
                                <div>
                                    Ostatnia wiadomość: {pair.lastMessage}
                                </div>
                                <hr></hr>
                            </Wrapper>
                        )
                    })
                }
            </div>
            <div className="right-panel"> Prawy panel
                {
                    currentMessages.map((message) => {
                        return (
                            <Wrapper>
                                <div>Od: {message.fromUserId}</div>
                                <div>Wiadomość: {message.message}</div>
                            </Wrapper>
                        )
                    })
                }
                <Wrapper>
                    <Formik
                        initialValues={{ message: 'test' }}
                        onSubmit={values => {
                            console.log(values)
                            const messageData = {
                                pairId: currentPair?.pairId,
                                toUserId: currentPair?.likedUserId,
                                message: values.message
                            };
                            console.log(messageData);

                            fetch('https://localhost:5001/Pairs/messages', {
                                method: 'POST',
                                headers: { "Content-Type": "application/json",
                                "Authorization": "Bearer " + sessionStorage.getItem('jwtToken'), },
                                body: JSON.stringify(messageData)
                            })
                            .then((response) => console.log(response))
                        }
                        }
                    >
                        <Form>
                            <label htmlFor="message">Wpisz wiadomość: </label>
                            <input name="message" id="message" type="text"></input>
                            <button type="submit">Wyślij</button>
                        </Form>
                    </Formik>
                </Wrapper>
            </div>
        </>
    )
};

export default MessagePage;