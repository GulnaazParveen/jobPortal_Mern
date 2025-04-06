import React from "react";
import ChatOwn from "./ChatOwn";
import ChatEmployerSample from "./ChatEmplyerSample";
import "./messageCSS/chatRight.css"
const ChatRight = ({
  messages,
  newMessage,
  handleNewSetMessage,
  handleSendMessage,
  conditionalClass,
}) => {
  const userId = localStorage.getItem("user._id");
  return (
    <>
      <div className="chat-right-container">
        <div className="chat-header">
          <div className="chat-header__company-name">Celebal Technology</div>
          <div className="jobTitle-employerName">
            <div className="chat-header__job-title">Frontend Developer</div>
            <div className="chat-header__employer-name">
              Chatting with Dildar
            </div>
          </div>
        </div>
        <div className="chat-box">
          {messages.map((msg, index) =>
            msg.senderId === userId ? (
              <ChatOwn
                key={index}
                msg={msg}
                conditainalClass={conditionalClass}
              />
            ) : (
              <ChatEmployerSample
                key={index}
                msg={msg}
                conditainalClass={conditionalClass}
              />
            )
          )}
        </div>
        <div className="chat-bottom">
          <textarea
            name="message"
            value={newMessage}
            onChange={handleNewSetMessage}
            id="message-input"
            placeholder="Type your message here..."
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRight;
