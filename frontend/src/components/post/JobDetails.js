import React from 'react'
import parse from "html-react-parser";
const JobDetails = ({content}) => {
  return <div>{parse(content)}</div>;
}

export default JobDetails
