import React from 'react'
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import "./Card.css"
const Card = ({data}) => {
    //  const {
    //    companyName,
    //    jobTitle,
    //    companyLogo,
    //    employmentType,
    //    postingDate,
    //    jobLocation,
    //  } = data;
  return (
    <div className="cardContainer">
      <div className="card-items ">
        <div className="card-left">
          <div className="card-item">
            <div className="company-logo">
              <img src={data.companyLogo} alt="" />
            </div>
            <div className="card-contents">
              <h3 className="comapanyname">{data.companyName}</h3>
              <h2 className="jobtitle">{data.jobTitle}</h2>
              <div className="card-content">
                <div className="location-icon">
                  <span>{/* <PlaceIcon className="icon"/> */}</span>
                  <span className="icon-text">
                    {data.location} || {data.category}
                  </span>
                </div>
                <div className="employementtype">
                  <span>{/* <AccessTimeFilledIcon className="icon"/> */}</span>
                  <span className="icon-text">{data.employmentType} || </span>
                </div>
                <div className="employementtype">
                  <span className="icon-text">{data.experienceLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-right">
          <div className="apply-btn">apply now</div>
          <div className="posted-date"> Date line: {data.postingDate}</div>
        </div>
      </div>
    </div>
  );
}

export default Card
