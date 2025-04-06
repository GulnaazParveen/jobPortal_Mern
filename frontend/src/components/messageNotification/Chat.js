import React, { useEffect, useRef, useState } from "react";
import ChatRight from "./chat/ChatRight";
import ChatLeft from "./chat/ChatLeft";
import { io } from "socket.io-client";
import "./chat/messageCSS/chat.css";

const Chat = () => {
 const [messages, setMessages] = useState([]);
 const [newMessage, setNewMessage] = useState("");
 const socket = useRef();

 // Retrieve and parse user data
 const userData = JSON.parse(localStorage.getItem("user")); // Parse the user object
 const userId = userData ? userData._id : null; // Get userId or set to null if not found
 const selectedJob = {
   employerId: "67269505de15b96c1510827f",
   title: "Software Engineer",
   companyName: "Celebal Technology",
 };

 useEffect(() => {
   socket.current = io("http://localhost:8900");

   if (userId) {
     socket.current.emit("addUserOrEmployer", userId); // Register user
   } else {
     console.error("User ID is null. Cannot register socket.");
   }

   socket.current.on("receiveMessage", (data) => {
     setMessages((prevMessages) => [...prevMessages, data]);
   });

   return () => {
     socket.current.disconnect();
   };
 }, [userId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: userId,
        receiverId: selectedJob.employerId,
        message: newMessage,
      };

      console.log("Sending message to receiverId:", selectedJob.employerId);
      socket.current.emit("sendMessage", messageData);
      setNewMessage(""); // Clear input after sending
    }
  };

  const handleNewSetMessage = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="chat-container">
      <div className="chat-container__applicant-info">
        <ChatLeft job={selectedJob} />
      </div>
      <div className="chat-container__conversation">
        <ChatRight
          messages={messages}
          newMessage={newMessage}
          handleNewSetMessage={handleNewSetMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
