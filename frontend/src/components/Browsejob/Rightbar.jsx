import React from "react";
import "./rightbar.css";
const Rightbar = () => {
  return (
    <>
      <div className="rightbar-container">
        <h2>Job Insights</h2>
        <div className="rightbar-items">
          <div className="rightbar-item">
            <h3 className="rightbar-title">Top Companies Hiring</h3>
            <div className="rightbar-content">Tech Logo</div>
            <div className="rightbar-content">Celebal Technologies</div>
            <div className="rightbar-content">Innovate Labs</div>
            <div className="rightbar-content">Microsoft</div>
          </div>
          <div className="rightbar-item">
            <h3 className="rightbar-title">Job Categories</h3>
            <div className="rightbar-content">Design & Art</div>
            <div className="rightbar-content">Engineering</div>
            <div className="rightbar-content">Sales & Marketing</div>
          </div>
          <div className="rightbar-item">
            <h3 className="rightbar-title">Trending Skills</h3>
            <div className="rightbar-content">React.js</div>
            <div className="rightbar-content">Python</div>
            <div className="rightbar-content">java</div>
            <div className="rightbar-content">Devops</div>
            <div className="rightbar-content">Figma</div>
          </div>
          <div className="rightbar-item">
            <h3>Remote Jobs</h3>
            <div className="rightbar-content">300+</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rightbar;
