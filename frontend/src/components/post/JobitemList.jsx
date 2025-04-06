import React, { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
const JobitemList = ({ job }) => {

 const formatDate = (isoString) => {
   const date = new Date(isoString);
   return date.toLocaleDateString("en-GB", {
     day: "2-digit",
     month: "short",
     year: "numeric",
   });
 };


  return (
    <div className="jobPostedItem ">
      <div className="company-items">
        <div className="posted-company-name">
          <span className="company-name">{job.jobTitle}</span>
        </div>
        <div className="company-item">
          <div className="company-location">
            <span className="location-icon">
              <PlaceIcon className="location" />
            </span>
            <span className="location-text">{job.location}</span>
          </div>
          <div className="employmentType">
            <span>{job.employmentType}</span>
          </div>
        </div>
      </div>
      <div className="applicant-Item">
        <span>Engineering</span>
      </div>
      <div className="created">
        <p>{formatDate(job.createdAt)}</p>
      </div>
      <div className="status-container">
        <span>pending</span>
      </div>
      <div className="EmployerActions-Items ">
        <div className="action-icon">
          <Link to={`/postjobform/${job._id}`}>
            <EditNoteIcon className="actionIcon" />
          </Link>
        </div>
        <div className="action-icon">
          <CancelIcon className="actionIcon" />
        </div>
      </div>
    </div>
  );
};

export default JobitemList;

