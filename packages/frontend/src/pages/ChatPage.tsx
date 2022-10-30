import React, { useState, useEffect } from 'react';
import { ChatItem } from "@my-todo-app/shared"
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ChatApp() {

    axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001"

    const [chatText, setChatText] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [session, setSession] = useState<boolean>(true);
    const [disableButton, setdisableButton] = useState<boolean>(true);
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [error, setError] = useState<string | undefined>();

    function logOut() {
        localStorage.clear();
    }

    const fetchChats = async (): Promise<ChatItem[]> => {
        const response = await axios.get<ChatItem[]>("/chat")
        return response.data
    }

    const fetchUser = async (): Promise<void> => {
        const token = localStorage.getItem('backend3')
        try {
            const response = await axios.post<any>("/chat/user", { token: token })

            setName(response.data.payload.name)
            setId(response.data.payload.id)
            setSession(false)
        } catch (err) {

        }
    }

    const createChatMessage = async (userName: string, chatText: string): Promise<void> => {
        if (chatText.length < 1 || chatText.trim().length < 1) {
            return;
        }

        const chatItem: ChatItem = {
            user: id,
            name: userName,
            text: chatText,
            timeStamp: new Date()
        }
        try {
            const response = await axios.post<ChatItem[]>('/chat', chatItem)
            setChats(response.data)
            console.log(chatText.trim())
            setChatText("")

        } catch (err) {
            setChats([])
            setError('Something went wrong when fetching posts...')
        }
    }

    useEffect(() => {
        fetchUser()
        const interval = setInterval(() => {
            fetchChats()
                .then(setChats)
                .catch((error) => {
                    setChats([])
                    setError('Something went wrong when fetching posts...')
                });
        }, 2500)

        return () => clearInterval(interval)
    }, []);


    const output = () => {
        if (error) {
            return (<div>{error}</div>)
        } else if (chats) {
            return (<div>{
                chats.map((item, index) => {
                    let truncatedDate = item.timeStamp.toString().split("T");
                    let truncatedTime = truncatedDate[1].split(".");
                    if (item.name == name) {

                        return (
                            <div className='chat-box-right'>
                                <div key={index} className="chat-section-right">
                                    <div className='chatTimeStampText'>
                                        <p>{truncatedDate[0]} {truncatedTime[0]}</p>
                                    </div>
                                    <div className='chatCard-right'>
                                        <div className='chatMessageText'>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                    <div className='chatNameText'>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {

                        return (
                            <div className='chat-box-left'>
                                <div key={index} className="chat-section-left">
                                    <div className='chatTimeStampText'>
                                        <p>{truncatedDate[0]} {truncatedTime[0]}</p>
                                    </div>
                                    <div className='chatCard-left'>
                                        <div className='chatMessageText'>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                    <div className='chatNameText'>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }</div>)
        } else {
            (<div>'Something went wrong fetching my todos...'</div>)
        }
    }

    return (
        <div className="App">
            <header className='header'>
                <div>
                    {session ?
                        <p></p> :
                        <p>Welcome: {name}</p>
                    }
                </div>
                <div>
                    <h2>ChatPage</h2>
                    {session ? <p>You need to log in to enter chat</p> : <></>}
                </div>
                <div>
                    {session ?
                        (<Link to="user/loginpage" className='link'>Log in</Link>) :
                        (<Link
                            to="/"
                            onClick={() => {
                                logOut();
                                setSession(true);
                                setName("");
                            }}
                            className='link'>Log out</Link>)}
                </div>
            </header>
            <section >
                {output()}
            </section>
            <footer className='chat-footer'>
                {session ?
                    <></> :
                    <div className="chatFrame">
                        <div>
                            <label>Message: </label>
                            <input
                                placeholder='Enter your message'
                                className='chatInput'
                                type="text"
                                value={chatText}
                                onChange={(e) => setChatText(e.target.value)}
                                required />
                        </div>
                        <div className='buttonBox'>
                            <button className="Button" onClick={(e) => createChatMessage(name, chatText)}>Send</button>
                        </div>
                    </div>
                }
            </footer>
        </div >
    );

}
