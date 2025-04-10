import React, { useState } from 'react'
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import "./Card.css"
import { Box, Button, IconButton, LinearProgress, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import "react-responsive-modal/styles.css";
import axios from "axios";
const Card = ({data}) => {
    const API_URL = process.env.REACT_APP_API_URL;
   const [isModalOpen, setIsModalOpen] = useState(false);
   const handleOpen = () => setIsModalOpen(true);
   const handleClose = () => setIsModalOpen(false);
   const [formData, setFormData] = useState({
     resume: "",
     linkedin: "",
     coverLetter: "",
   });
   
   const userData=JSON.parse(localStorage.getItem("user"));
   console.log("userData",userData);
   
   const handleChange = (e) => {
     const { name, type } = e.target;
     if (type === "file") {
       setFormData({
         ...formData,
         [name]: e.target.files[0],
       });
     } else {
       setFormData({
         ...formData,
         [name]: e.target.value,
       });
     }
   };

const handlesubmit=async()=>{
  const source = new URLSearchParams(window.location.search).get("source") || "CompanyWebsite";
  const formPayload = new FormData();
  formPayload.append("resume", formData.resume); 
  formPayload.append("coverLetter", formData.coverLetter);
  formPayload.append("linkedin", formData.linkedin);
  formPayload.append("jobId", data._id);
  formPayload.append("userId", userData._id);
  formPayload.append("source", source);

  try {
    const res = await axios.post(
      `${API_URL}/api/v1/users/applications`,
      formPayload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Application Submitted");
    setIsModalOpen(false);
  } catch (err) {
    console.error("Apply error", err);
  }
}
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
          <div className="apply-btn" onClick={() => setIsModalOpen(true)}>
            apply now
          </div>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              className="form-container"
              sx={{
                width: 500,
                height: 400,
                bgcolor: " #ffffff",
                p: 4,
                position: "relative",
              }}
            >
              <IconButton
                aria-label="close"
                onClick={() => setIsModalOpen(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
              <Button
                variant="outlined"
                component="label"
                sx={{ mt: 2, width: "100%" }}
              >
                Upload Resume (PDF)
                <input
                  name="resume"
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </Button>
              <TextField
                name="linkedin"
                label="LinkedIn Profile (optional)"
                fullWidth
                margin="normal"
                value={formData.linkedin}
                onChange={handleChange}
              />
              <TextField
                name="coverLetter"
                label="Cover Letter (optional)"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={formData.coverLetter}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handlesubmit}
              >
                Submit Application
              </Button>
            </Box>
          </Modal>
          <div className="posted-date"> Date line: {data.postingDate}</div>
        </div>
      </div>
    </div>
  );
}

export default Card
