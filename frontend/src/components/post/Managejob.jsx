import React, { useEffect, useState } from 'react'
import JobitemList from './JobitemList';
import "./managejob.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Managejob = () => {
    const [jobs, setJobs] = useState([]);
     const [jobCount, setJobCount] = useState(0);
    const {id}=useParams()
useEffect(() => {
  if (id) {
    axios
      .get(`http://localhost:8000/api/v1/Jobs/employer/${id}`)
      .then((response) =>{
        setJobs(response.data.data);
         setJobCount(response.data.noOfJobs);
        
      })
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
              <p className="heading-item">Created</p>
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
              <JobitemList key={job._id} job={job} jobCount={jobCount} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Managejob


