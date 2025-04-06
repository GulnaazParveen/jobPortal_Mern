import React, { useEffect, useState } from 'react'
import "./messageCSS/chatLeft.css";
import axios from 'axios';
const ChatLeft = ({ job }) => {
 
  return (
    <>
      <div className="applicants-container">
        <div className="copmanyDetails">
          <div className="company-name">
             {job.companyName}
          </div>
          <div className="applyDate">28/10/24</div>
        </div>
        <div className="job-container">
          <div className="jobTitle">frontend develoer</div>
          <div className="jobstatus">not selected</div>
        </div>
      </div>
    </>
  );
};

export default ChatLeft
