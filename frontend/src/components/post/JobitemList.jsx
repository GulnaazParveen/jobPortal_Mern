import React, { useEffect, useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const JobitemList = ({ job }) => {
  return (
    <div className="jobPostItems">
      <div className="jobPostedItem company-Details">
        <div className="posted-company-name">
          <span className="company-name">{job.companyName}</span>
          <span className="posted-done">
            <CheckCircleIcon className="done" />
          </span>
        </div>
        <div className="company-location">
          <span className="location-icon">
            <PlaceIcon className="locicon" />
          </span>
          <span className="location-text">{job.location}</span>
        </div>
        {/* Other fields */}
        <div className="EmployerActions-Items jobPostedItem">
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
    </div>
  );
};

export default JobitemList;

