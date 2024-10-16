import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./footer.css"
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-items">
        <div className="footer-item">
          <div className="footer-left">
            <div className="search">
              <SearchIcon className="search-icon" />
            </div>
            <div className="jobportal-title">
              <h1 className="main-title">job board</h1>
              <p className="title-subtext">find your dream job</p>
            </div>
          </div>
          <div className="cta-container">
            <div className="email">finloan@support.com</div>
            <div className="mobileno">+10 873 672 6782 </div>
            <div className="location">
              <span>600/D,</span>
              <span>Green road</span>
              <span>NewYork</span>
            </div>
          </div>
          <div className="follow-container">
            <div className="icons">
              <div className="icon">
                <FacebookIcon />
              </div>
              <div className="icon">
                <GoogleIcon />
              </div>
              <div className="icon">
                <TwitterIcon />
              </div>
              <div className="icon">
                <InstagramIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-item">
          <h3 className="company-details">Company </h3>
          <div className="company-content-container">
            <div className="company-content">About</div>
            <div className="company-content">Pricing</div>
            <div className="company-content">Carrier Tips</div>
            <div className="company-content">FAQ</div>
          </div>
        </div>
        <div className="footer-item">
          <h3 className="company-details">Category </h3>
          <div className="company-content-container">
            <div className="company-content">Design & Art</div>
            <div className="company-content">Engineering</div>
            <div className="company-content">Sales & Marketing</div>
            <div className="company-content">Finance</div>
          </div>
        </div>
        <div className="footer-item">
          <h3 className="company-details">Subscribe</h3>
          <div className="company-content-container">
            <div className="userinput">
              <input
                type="text"
                name="Email"
                placeholder="Enter Your Mail"
                className="useremail"
              />
              <span className="subscribe">Subscribe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer
