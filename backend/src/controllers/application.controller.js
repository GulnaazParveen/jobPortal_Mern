import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import applicantion from "../models/application.model.js";
import job from "../models/createJob.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const userApplication=asyncHandler(async(req,res)=>{
  const { jobId, userId, coverLetter, linkedin, source } = req.body;

  const resumeFile = req.files?.resume?.[0]; // ✅ get 'resume', not 'avatar'
  console.log("Files:", req.files);

  if (!jobId || !userId || !resumeFile) {
    throw new ApiError(400, "Job ID, User ID, and Resume file are required");
  }

  const resumePath = resumeFile.path;
  if (!resumePath) {
    throw new ApiError(400, "Invalid resume file");
  }

  const resumeUpload = await uploadOnCloudinary(resumePath);
  if (!resumeUpload || !resumeUpload.secure_url) {
    throw new ApiError(400, "Failed to upload resume");
  }

  const resumeUrl = resumeUpload.secure_url;

  const application = await applicantion.create({
    jobId,
    userId,
    resume: resumeUrl,
    coverLetter,
    linkedin,
    source: source || "CompanyWebsite",
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, application, "Application submitted successfully")
    );
});


export { userApplication };