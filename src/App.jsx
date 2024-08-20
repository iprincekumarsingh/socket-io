// client-side code
import React, { useEffect, useState } from 'react';
import { useSocket } from './context/SocketContext';
import './App.css';
import axios from 'axios';

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";
const MESSAGE_DELETE_EVENT = "messageDeleted";

function App() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [chatId, setChatId] = useState('668bac699e6c125e52c2c59d');
  const [message, setMessage] = useState(""); // To store the currently typed message
  const [isConnected, setIsConnected] = useState(false); // For tracking socket connection

  useEffect(() => {
    if (!socket) return;
    setToken(localStorage.getItem('token'))
    console.log(token);

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);

    socket.on(MESSAGE_RECEIVED_EVENT, (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(MESSAGE_RECEIVED_EVENT);
    };
  }, [socket]);

  const getAllMessages = async () => {
    if (!chatId) return alert("No chat is selected");
    if (!socket) return alert("Socket not available");
    const mytoken = localStorage.getItem('token')

    socket.emit(JOIN_CHAT_EVENT, chatId);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/message/${chatId}`, {
        headers: {
          Authorization: `Bearer ${mytoken}`
        }
      });
      // setMessages(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const sendMessage = async (token, content) => {
    if (!chatId || !socket) return;

    try {
      socket.emit(STOP_TYPING_EVENT, chatId);


      console.log(token);
      const response = await axios.post(`http://localhost:5000/api/v1/message/${chatId}`, { content }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleGetMessages = () => {
    getAllMessages(token);
  };

  const handleSendMessage = () => {
    sendMessage(token, message);
    setMessage('');
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="message-user">{msg.userName}</span>: {msg.content} <span className="message-timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="input-container" style={{ gap: 5 }}>
        <input
          type="text"
          placeholder="Chat Id"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button onClick={handleGetMessages}>Get All Messages</button> <br />
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
