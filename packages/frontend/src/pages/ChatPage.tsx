import React, { useState, useEffect } from 'react';
import { ChatItem } from "@my-todo-app/shared"
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ChatApp() {

    axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001"

    const fetchChats = async (): Promise<ChatItem[]> => {
        const response = await axios.get<ChatItem[]>("/chat")
        return response.data
    }

    const [chatText, setChatText] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [error, setError] = useState<string | undefined>();

    const createChatMessage = async (userName: string, chatText: string): Promise<void> => {
        const chatItem: ChatItem = {
            name: userName,
            text: chatText,
            timeStamp: new Date()
        }
        try {
            const response = await axios.post<ChatItem[]>('/chat', chatItem)
            setChats(response.data)
            setChatText("")
            setUserName("")
        } catch (err) {
            setChats([])
            setError('Something went wrong when fetching posts...')
        }
    }

    useEffect(() => {
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
                chats.map((item) => {
                    let truncatedDate = item.timeStamp.toString().split("T");
                    let truncatedTime = truncatedDate[1].split(".");
                    return (
                        <div>
                            <div className='chatTimeStampText'>
                                <p key={item.id}>{truncatedDate[0]} {truncatedTime[0]}</p>
                            </div>
                            <div className='chatCard'>
                                <div className='chatMessageText'>
                                    <p key={item.id}>{item.text}</p>
                                </div>
                            </div>
                            <div className='chatNameText'>
                                <p key={item.id}>{item.name}</p>
                            </div>
                        </div>
                    )
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

                </div>
                <div>
                    <h2>ChatPage</h2>
                </div>
                <div>
                    <Link to="/user/loginpage" className="link">Log In</Link>
                </div>
            </header>
            <section className="chat-section">
                {output()}
            </section>
            <footer className='chat-footer'>
                <div className="chatFrame">
                    <div>
                        <label>Name: </label>
                        <input
                            placeholder='Enter your name'
                            className='chatInput'
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required />
                    </div>
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
                        <button className="sendButton" onClick={(e) => createChatMessage(userName, chatText)}>Send</button>
                    </div>
                </div>
            </footer>

        </div >
    );

}
