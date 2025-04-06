import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "./browsejob.css";
import Sidebar from "../sidebar/Sidebar";
import Joblistining from "../joblistning/Joblistining";
import BrowseSearch from "./BrowseSearch";
import axios from "axios";

const Browsejob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const location = searchParams.get("location") || "";
  const employmentType = searchParams.get("employmentType") || "";
  const experienceLevel = searchParams.get("experienceLevel") || "";
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/users/getjob`, {
        withCredentials: true,
      })
      .then((res) => {
        const jobsData = res.data.data;
        console.log("this is  job ",jobsData);
        
        setJobs(jobsData); 

        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filterData = (jobs) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (location && location !== "All") {
      filteredJobs = filteredJobs.filter(
        (job) => job.location.toLowerCase() === location.toLowerCase()
      );
    }

    if (employmentType) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.employmentType.toLowerCase() === employmentType.toLowerCase()
      );
    }

    if (experienceLevel) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.experienceLevel.toLowerCase() === experienceLevel.toLowerCase()
      );
    }
    return filteredJobs;
  };

  const filteredJobs = useMemo(
    () => filterData(jobs),
    [jobs, location, employmentType, experienceLevel, query]
  );

  return (
    <div>
      <div className="search-containers">
        <BrowseSearch />
      </div>
      <div className="browsejob-container">
        <div>
          <Sidebar />
        </div>
        <div className="job-middle-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Joblistining jobs={filteredJobs} />
          )}
        </div>
        <div>right</div>
      </div>
    </div>
  );
};

export default Browsejob;
