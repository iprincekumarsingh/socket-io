import React, { useEffect, useState } from "react";
import { useSocket } from "./context/SocketContext";
import axios from "axios";

const JOIN_CHAT_EVENT = "joinChat";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";

function App() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("668be02b22f6f2daeb276295");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [isConnected, setIsConnected] = useState(false);

  const getAllMessages = async () => {
    if (!chatId) return alert("No chat is selected");
    if (!socket || !socket.connected)
      return alert("Socket not available or not connected");

    try {
      const res = await axios.get(
        `http://localhost:5001/api/v1/message/${chatId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkwMWQyYjQzM2QxZTY4YzlmYjU4YTMiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTUwMjM5NSwiZXhwIjoxNzIxNTAzMjk1fQ.ilUmnkOI3Orbe6V7X7AJyZOWyWDuRtCcKLVERrWn5hA`, // Use token from localStorage
          },
        }
      );
      // setMessages(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const sendMessage = async (token, content) => {
    if (!chatId || !socket || !socket.connected) return;

    try {
      socket.emit(STOP_TYPING_EVENT, chatId);

      const response = await axios.post(
        `http://localhost:5001/api/v1/message/${chatId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming response.data is the new message object
      // setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleGetMessages = () => {
    getAllMessages();
  };

  const handleSendMessage = () => {
    sendMessage(token, message);
    setMessage("");
  };

  useEffect(() => {
    if (!socket || !socket.connected) {
      setIsConnected(false);
      return;
    }

    setIsConnected(true);

    socket.emit(JOIN_CHAT_EVENT, chatId);

    const onMessageReceived = ({ msg }: any) => {
      console.log(msg);
    };

    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);

    return () => {
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    };
  }, [socket, chatId]);

  return (
    <div className="app-container">
      <div className="chat-container">
        {/* Render messages here */}
        {/* <ul>
          {messages.map((msg) => (
            <li key={msg.id}>{msg.content}</li>
          ))}
        </ul> */}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Chat Id"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
        />
        <button onClick={handleGetMessages}>Get All Messages</button>
        <br />
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
