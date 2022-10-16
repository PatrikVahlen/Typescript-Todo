import React, { useState, useEffect } from 'react';
import ChatItem from "@my-todo-app/shared"
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3001"

const fetchTodos = async (): Promise<ChatItem[]> => {
  const response = await axios.get<ChatItem[]>("/todos")
  return response.data
}

function App() {
  const [chatText, setChatText] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [error, setError] = useState<string | undefined>();

  const createTodo = async (userName: string, chatText: string): Promise<void> => {
    const chatItem: ChatItem = {
      name: userName,
      text: chatText,
      timeStamp: new Date()
    }
    try {
      const response = await axios.post<ChatItem[]>('/todos', chatItem)
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
      fetchTodos()
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
              <p key={item.id}>{item.text}</p>
              <p key={item.id}>{truncatedDate[0]} {truncatedTime[0]}</p>
              <p key={item.id}>{item.name}</p>
            </div>)
        })
      }</div>)
    } else {
      (<div>'Something went wrong fetching my todos...'</div>)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* {todo ? todo.text : error ? error : "Waiting for todos.."} */}
        {output()}
        <section>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required />

          <br></br>
          <input
            type="text"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            required />

          <button onClick={(e) => createTodo(userName, chatText)}>Send</button>
        </section>
      </header>
    </div >
  );
}

export default App;
