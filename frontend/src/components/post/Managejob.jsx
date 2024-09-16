import React, { useEffect, useState } from 'react'
import JobitemList from './JobitemList';
import "./managejob.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Managejob = () => {
    const [jobs, setJobs] = useState([]);
    const {id}=useParams()
useEffect(() => {
  if (id) {
    axios
      .get(`http://localhost:8000/api/getjob/${id}`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching job data:", error));
  }
}, [id]);


  return (
    <>
      <div className="manageJob-Container">
        <div className="managejob-subcont">
          <div className="managejob-Heading">
            <div className="headingitems">
              <p>Title</p>
            </div>
            <div className="headingitems">
              <p className="applicant">Applicants</p>
            </div>
            <div className="headingitems">
              <p className="heading-item">Created & Expired</p>
            </div>
            <div className="headingitems">
              <p>status</p>
            </div>
            <div className="headingitems">
              <p>Actions</p>
            </div>
          </div>
          <div className="mangajob-items">
            {jobs.map((job) => (
              <JobitemList key={job._id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Managejob
