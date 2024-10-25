import React, { useEffect, useState } from 'react'
import JobitemList from './JobitemList';
import "./managejob.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DemographicPieChart from '../employer/DemographicPieChart';

import ApplicantTrendsLineChart from '../employer/ApplicantTrendsLineChart';
import ApplicantPieChart from '../employer/ApplicantPieChart';
import JobViewsBarChart from '../employer/JobViewsBarChart';



const Managejob = () => {
    const [jobs, setJobs] = useState([]);
     const [jobCount, setJobCount] = useState(0);
    const {id}=useParams()
     const API_URL = process.env.REACT_APP_API_URL;
useEffect(() => {
  if (id) {
    axios
      .get(`${API_URL}/api/v1/Jobs/employer/${id}`)
      .then((response) => {
        setJobs(response.data.data);
        setJobCount(response.data.noOfJobs);
      })
      .catch((error) => console.error("Error fetching job data:", error));
  }
}, [id]);


  return (
    <>
      <div className="dashboard-container">
        <div className="piechart-barchart">
          <div className="applicantlinechart">
            <JobViewsBarChart />
          </div>
          <div className="applicantpiechart">
            <DemographicPieChart />
          </div>
        </div>
        <div className="piechart-linechart">
          <div className="applicantpiechart">
            <ApplicantPieChart />
          </div>
          <div className="applicantlinechart">
            <ApplicantTrendsLineChart />
          </div>
        </div>
      </div>
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


