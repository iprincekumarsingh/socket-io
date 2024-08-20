import axios from "axios";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import {ChatEventEnum} from "../constants.js";

function RandomCall() {
  const { socket } = useSocket();

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for the matchFound event
    socket.on(ChatEventEnum.MATCH_FOUND_EVENT, (data) => {
      console.log("Match found:", data);
      // Handle the match found event here (e.g., display notification, redirect user, etc.)
    });

    // Cleanup on component unmount
    return () => {
      socket.off(ChatEventEnum.MATCH_FOUND_EVENT);
    };
  }, [socket]);

  const talkPressed = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.5:5001/api/v1/call/random-call/call-request",
        {
          topic: "RandomCall",
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkwMWQyYjQzM2QxZTY4YzlmYjU4YTMiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyMTUwMjM5NSwiZXhwIjoxNzIxNTAzMjk1fQ.ilUmnkOI3Orbe6V7X7AJyZOWyWDuRtCcKLVERrWn5hA`, // Use token from localStorage
          },
        }
      );

      // Handle the response data
      console.log("Response:", response.data);
    } catch (error) {
      // Handle the error
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container} onClick={talkPressed}>
      <span style={styles.text}>RandomCall</span>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
};

export default RandomCall;
