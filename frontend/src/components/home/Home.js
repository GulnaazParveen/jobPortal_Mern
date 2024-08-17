import React from 'react';
import './home.css';

const Home = ({ isDynamicTextBasedOnRoutes, dynamicText }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h3 className={isDynamicTextBasedOnRoutes ? "textstyle" : "job-list"}>{dynamicText}</h3>
          <h1 className={isDynamicTextBasedOnRoutes ? "hideDivBasedonRoutes " : "hero-title"}>
            Find Your Dream Job
          </h1>
          <p className={isDynamicTextBasedOnRoutes ? "hideDivBasedonRoutes " : "hero-decription"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className={isDynamicTextBasedOnRoutes ? "hideDivBasedonRoutes " : "ctn-btn"}>
          <p>Upload Your Resume</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
