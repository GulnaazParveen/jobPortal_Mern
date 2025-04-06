import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import applicantion from "../models/application.model.js";
import job from "../models/createJob.js";
import mongoose from "mongoose";
const userApplication=asyncHandler(async(req,res)=>{
    const jobFound = await job.findOne();
    if (!jobFound) {
      throw new ApiError(400, "No job found");
    }

    const dummyApps = [
      {
        jobId: jobFound._id,
        userId: new mongoose.Types.ObjectId(),
        source: "SocialMedia",
      },
      {
        jobId: jobFound._id,
        userId: new mongoose.Types.ObjectId(),
        source: "JobBoards",
      },
      {
        jobId: jobFound._id,
        userId: new mongoose.Types.ObjectId(),
        source: "Referral",
      },
      {
        jobId: jobFound._id,
        userId: new mongoose.Types.ObjectId(),
        source: "Email",
      },
      {
        jobId: jobFound._id,
        userId: new mongoose.Types.ObjectId(),
        source: "CompanyWebsite",
      },
    ];

    await applicantion.insertMany(dummyApps);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          dummyApps,
          "Dummy applications inserted successfully"
        )
      );
})
export { userApplication };