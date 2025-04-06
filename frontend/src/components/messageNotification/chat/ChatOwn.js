import React from "react";

const ChatOwn = ({ conditionalClass }) => {
  return (
    <>
      <div className={` ${conditionalClass}`}>
        <p className="chat-message__text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
          laborum inventore, voluptatem nisi illum veritatis.
        </p>
        <div className="chat-message__footer">
          <div className="chat-message__thanks">Thanks</div>
          <div className="chat-message__author">Gulnaaz</div>
        </div>
      </div>
    </>
  );
};

export default ChatOwn;
