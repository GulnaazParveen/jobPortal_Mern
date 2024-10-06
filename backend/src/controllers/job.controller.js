import { asyncHandler } from "../utils/asyncHandler.js";
import job from "../models/createJob.js";
import employerModel from "../models/employerRegister.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
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

  // Validate employerId
  if (!mongoose.Types.ObjectId.isValid(employerId)) {
    throw new ApiError(400, "Invalid employerId format");
  }

  const employerObjectId = new mongoose.Types.ObjectId(employerId); 

  const jobDoc = await job.create({
    employer: employerObjectId, // Use ObjectId here
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
  });
  await jobDoc.save();
  const jobCreated = await job.findById(jobDoc._id);

  if (!jobCreated) {
    throw new ApiError(400, "job not found or created");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, jobCreated, "job created successfully"));
}); 

// find all job
const findAllJobs = asyncHandler(async (req, res) => {
  const foundJobs = await job.find();
  return res
    .status(201)
    .json(new ApiResponse(200, foundJobs, "find all job successfully"));
});


const findJobsByEmployerId = asyncHandler(async (req, res) => {
  const { employerId } = req.params; // Get the employerId from the request params

  

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(employerId)) {
    return res.status(400).json({ message: "Invalid employer ID format." });
  }

  // Find the employer using the ObjectId
  const employer = await employerModel.findById(employerId);
  if (!employer) {
    return res.status(404).json({ message: "Employer not found." });
  }

  // Fetch jobs linked to this employer's _id
  const jobs = await job.find({ employer: employer._id });


const noOfJobsByIndividualEmployer=await job.countDocuments({employer:employerId})

  if (jobs.length === 0) {
    return res
      .status(404)
      .json({ message: "No jobs found for this employer." });
  }

  return res.status(200).json({
    success: true,
    data: jobs,
    noOfJobs: noOfJobsByIndividualEmployer,
    message: "Jobs fetched successfully.",
  });
});


export { createJob, findAllJobs, findJobsByEmployerId };
