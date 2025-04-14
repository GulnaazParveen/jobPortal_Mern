import { asyncHandler } from "../utils/asyncHandler.js";
import job from "../models/createJob.js";
import employerModel from "../models/employerRegister.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
    department,
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
      department,
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
    employer: employerObjectId,
    name,
    websiteurl,
    phone,
    companyName,
    companyLogo,
    employmentType,
    experienceLevel,
    jobTitle,
    location,
    department,
    jobViews: 0,
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
  const { employerId } = req.params; 

  

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


// Get job by ID and increment jobViews
const getJobByIdAndIncrementViews = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Job ID");
  }

  const jobData = await job.findByIdAndUpdate(
    id,
    { $inc: { jobViews: 1 } },
    { new: true }
  );

  if (!jobData) {
    throw new ApiError(404, "Job not found");
  }
  // 🔍 Debug department field
  console.log("📦 Job Data:", jobData);
  console.log("📁 Department:", jobData.department);
  return res
    .status(200)
    .json(new ApiResponse(200, jobData, "Job fetched and view incremented"));
});
const getViewsByDepartment = asyncHandler(async (req, res) => {
  const jobs = await job.find({}, { department: 1, jobViews: 1 });
  console.log(jobs);

  const views = await job.aggregate([
    {
      $match: {
        department: { $nin: [null, ""] }, // ✅ FIXED
      },
    },
    {
      $group: {
        _id: "$department",
        totalViews: { $sum: "$jobViews" }, // ✅ Make sure field is named exactly this
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, views, "Views by department fetched"));
});
// apply for job

export {
  createJob,
  findAllJobs,
  findJobsByEmployerId,
  getJobByIdAndIncrementViews,
  getViewsByDepartment,
};
