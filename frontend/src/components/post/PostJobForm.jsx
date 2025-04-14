import React, { useState} from "react";
import "./postjobform.css";
import TipTap from "./TipTap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const PostJobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the job ID from the URL parameters
  const employerData = JSON.parse(localStorage.getItem("employer"));
  const employerId = employerData?._id || ""; // Ensure employerId is available
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    employerId: employerId,
    name: "",
    phone: "",
    companyName: "",
    companyLogo: "",
    jobTitle: "",
    department: "Engineering",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    location: "",
    websiteurl: "",
    jobDescription: "",
  });
  
  // In handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

 

    const method = id ? "put" : "post";
    const url = id
      ? `${API_URL}/api/v1/Jobs/employer/${id}`
      : `${API_URL}/api/v1/Jobs/createJob`;

    try {
      const response = await axios({
        method: method,
        url: url,
        data: { ...formData, employerId: employerData._id }, // Use correct employerId
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Job saved successfully:", response.data);
      navigate("/browseJob");
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };

  const handleEventContentSave = (html) => {
    const plainText = stripHtmlTags(html);

    setFormData((prevFormData) => ({
      ...prevFormData,
      jobDescription: plainText, // Save the plain text string
    }));
  };

  return (
    <div className="form-Employer-container">
      <h2 className="header">Post a Job</h2>
      <form action="POST" className="form">
        <div className="grid">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Alternate Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="grid">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="companyLogo"
            placeholder="Company Logo URL"
            value={formData.companyLogo}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="grid">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="input handleInput"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input handleInput"
          />
          <input
            type="text"
            name="websiteurl"
            placeholder=" websiteurl"
            value={formData.websiteurl}
            onChange={handleChange}
            className="input handleInput"
          />
        </div>
        <div className="grid">
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="select"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Temporary">Temporary</option>
            <option value="Contract">Contract</option>
          </select>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="select"
          >
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="select"
          >
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Product Management">Product Management</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <h3>Job Description</h3>
          <TipTap onEditorContentSave={handleEventContentSave} />
        </div>
        <button type="submit" className="submitButton" onClick={handleSubmit}>
          {id ? "Update Job" : "Post Job"}
        </button>
      </form>
    </div>
  );
};


export default PostJobForm;
