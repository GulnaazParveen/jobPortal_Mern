import { asyncHandler } from "../utils/asyncHandler.js";
import job from "../models/createJob.js";
import employerModel from "../models/employerLogin.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
const createJob = asyncHandler(async (req, res) => {
  const {
    employerId,
    name,
    websiteurl,
    phone,
    companyName,
    companyLogo,
    employmentType,
    experienceLevel,
    jobTitle,
    location,
    jobDescription,
  } = req.body;

  if (
    [
      employerId,
      name,
      websiteurl,
      phone,
      companyName,
      companyLogo,
      jobTitle,
      location,
      jobDescription,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
}); 

// find all job
const findAllJobs = asyncHandler(async (req, res) => {
  const foundJobs = await job.find();
  return res
    .status(201)
    .json(new ApiResponse(200, foundJobs, "find all job successfully"));
});


// find job by employer id
const findJobsByEmployerId = asyncHandler(async (req, res) => {
  const { employerId } = req.params;


  const employer = await employerModel.findOne({ employerId });
  if (!employer) {
    throw new ApiError(400, "Employer not found");
  }


  const jobs = await job.find({ employer: employer._id }).populate("employer");

   if(!job){
        throw new ApiError(400,"fetch job faild based on id ")
   }
  return res
    .status(201)
    .json(
      new ApiResponse(200, jobs, "Find job successfully based on employerID")
    )


});

export { createJob, findAllJobs, findJobsByEmployerId };
