import React, { useState } from "react";
import Card from "../Browsejob/Card";
import Paginationjob from "./Paginationjob";
import "./joblistining.css"
const Joblistining = ({ jobs }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const count = Math.ceil(jobs.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const selectedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div>
        {selectedJobs.length > 0 ? (
          selectedJobs.map((job, index) => <Card key={index} data={job} />)
        ) : (
          <p>No jobs to display</p>
        )}
      </div>
      <div className="pagination-container">
        <Paginationjob count={count} page={page} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Joblistining;
