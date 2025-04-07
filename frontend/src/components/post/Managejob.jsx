import React, { useEffect, useState } from "react";
import JobitemList from "./JobitemList";
import "./managejob.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ApplicantTrendsLineChart from "../employer/ApplicantTrendsLineChart";
import ApplicantPieChart from "../employer/ApplicantPieChart";
import JobViewsBarChart from "../employer/JobViewsBarChart";

const Managejob = () => {
  const [jobs, setJobs] = useState([]);

  const [jobCount, setJobCount] = useState(12);
  const [applicantcount, setApplicantCount] = useState(350);
  const [source, setSource] = useState("");
  const [applicantTrend, setApplicantTrend] = useState([]);
const [departmentViews, setDepartmentViews] = useState([]);

  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/api/v1/employers/employer/${id}`)
        .then((response) => {
          // console.log("job", response.data.data);
          
          setJobs(response.data.data);
        })
        .catch((error) => console.error("Error fetching job data:", error));
    }
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/employers/stats`)
      .then((response) => {
        const { totalJobs, totalApplicants, sourceBreakdown, applicantTrend } =
          response.data.data;
        console.log("all data", response.data.data);

        setJobCount(totalJobs);
        setApplicantCount(totalApplicants);

        // Convert source breakdown into pie chart format
        const formattedSources = sourceBreakdown.map((item) => ({
          name: item._id, // Example: "Email", "Social Media"
          value: item.count, // Total applicants from that source
        }));

        setSource(formattedSources);

        // Convert applicant trend data for line chart
       const formattedTrends = applicantTrend.map((item) => ({
         date: item.date, // ✅ now it will show dates like "2025-04-01"
         count: item.count,
         source:item.source
       }));


        setApplicantTrend(formattedTrends);
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, [jobs]); 

useEffect(() => {
  axios
    .get(`${API_URL}/api/v1/employers/viewByDepartment`)
    .then((response) => {
      console.log("department views", response.data.data);
      
      setDepartmentViews(response.data.data); // Assuming your controller returns it as data
    })
    .catch((error) => console.error("Error fetching department views:", error));
}, []);
  return (
    <>
      <div className="dashboard-container">
        <div className="summary-graph-container">
          <div className="matrices-container">
            <div className="jobs-container">
              <h3>Total Job</h3>
              <div className="count">{jobCount}</div>
            </div>
            <div className="applicant-container">
              <h3>Total Applicants</h3>
              <div className="count">{applicantcount}</div>
            </div>
          </div>
          <div className="applicantlinechart">
            <JobViewsBarChart jobs={jobs} departmentViews={departmentViews} />
          </div>
        </div>
        <div className="piechart-barchart">
          <div className="applicantpiechart">
            <ApplicantPieChart source={source} />
          </div>
          <div className="applicantlinechart">
            <ApplicantTrendsLineChart
              applicantTrend={applicantTrend}
              source={source}
            />
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
              <p className="applicant">Departments</p>
            </div>
            <div className="headingitems">
              <p className="heading-item">Posted</p>
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
};

export default Managejob;
