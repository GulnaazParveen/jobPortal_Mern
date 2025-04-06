import React from "react";
import "./messageCSS/chatEmployer.css";

const ChatEmployerSample = ({ msg, conditionalClass }) => {
  // Parse `user` from localStorage, default to null if not found
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <div className={`chat-message ${conditionalClass}`}>
      <div className="chat-message__sender-name">
        {user && msg.senderId === user._id ? user.name : "dfsfs"}
      </div>
      <div className="chat-message__content">{msg.message}</div>
      <div className="chat-message__footer">
        <div className="chat-message__thank-you">Thanks</div>
        <div className="chat-message__author-name">
          {msg.senderId ? msg.name : "employersender"}
        </div>
        <div className="chat-message__company-name">Celebal Technology</div>
      </div>
    </div>
  );
};

export default ChatEmployerSample;
