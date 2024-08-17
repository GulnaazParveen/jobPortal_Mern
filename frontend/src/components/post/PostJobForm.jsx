import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const PostJobForm = () => {
const naviagte=useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companyLogo: "",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    jobTitle: "",
    location: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      jobDescription: value,
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:8000/api/postjob",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        naviagte("/browseJob");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Post a Job</h2>
      <form action="POST" style={styles.form}>
        <div style={styles.grid}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.grid}>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.grid}>
          <input
            type="text"
            name="companyLogo"
            placeholder="Company Logo URL"
            value={formData.companyLogo}
            onChange={handleChange}
            style={styles.input}
          />
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Temporary">Temporary</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div style={styles.grid}>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Internship">Internship</option>
          </select>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.quillContainer}>
          <h3>Job Description</h3>
          <ReactQuill
            value={formData.jobDescription}
            onChange={handleQuillChange}
            style={styles.quill}
          />
        </div>
        <button type="submit" style={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "800px",
    margin: "20px auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    marginBottom: "3rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    display: "flex",
    gap: "20px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  select: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    marginRight:"2rem"
  },
  quillContainer: {
    marginBottom: "15px",
  },
  quill: {
    height: "240px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "45px",
    alignSelf: "center",
    width: "150px",
  },
};

export default PostJobForm;
