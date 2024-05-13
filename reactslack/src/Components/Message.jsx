import React from 'react';
import Jane from './Assets/Chris.jpg';

const Message = ({ msg }) => {
  return (
    <div className="message">
      <div className="messageInfo">
        {/* <img src={Jane} alt="" /> */}
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default Message;
