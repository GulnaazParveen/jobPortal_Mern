import React from 'react'
import SmsIcon from "@mui/icons-material/Sms";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
const MessageNotification = ({ user, employerdata }) => {
  return (
    <>
      <div className="messageAndNotification-container">
        <div className="notification">
          <CircleNotificationsIcon
            style={{ height: "2em", width: "1.5em", color: "white" }}
          />
        </div>
        <div className="message">
          {user ? (
            <Link to={`user/chat/${user._id}`}>
              <SmsIcon
                style={{ height: "2em", width: "1.5em", color: "white" }}
              />
            </Link>
          ) : employerdata ? (
            <Link to={`employer/chat/${employerdata._id}`}>
              <SmsIcon
                style={{ height: "2em", width: "1.5em", color: "white" }}
              />
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MessageNotification
