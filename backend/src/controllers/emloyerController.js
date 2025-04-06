import employerModel from "../models/employerRegister.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import job from "../models/createJob.js";
import application from "../models/application.model.js";
const generateAccessAndRefereshTokens = async (employerId) => {
  try {
    const employer = await employerModel.findById(employerId);
    const accessToken = employer.generateAccessToken();
    const refreshToken =  employer.generateRefreshToken();

    employer.refreshToken = refreshToken;
    await employer.save({ validateBeforeSave: false });
  
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

// employer registered
 const employerRegisters=asyncHandler(async(req,res)=>{
    const {name,email,password,mobileNumber,Address}=req.body;

     if([name,email,password,mobileNumber,Address].some((field)=>field?.trim() === "")){
      throw new ApiError(400, "All fields are required");
     }

      const employerExit = await employerModel.findOne({ email });

     if(employerExit){
           throw new ApiError(409, "Employer email already exists");
     }
     const employerDoc = await employerModel.create({
       name: name.toLowerCase(),
       email,
       password,
       mobileNumber,
       Address,
     });
   await employerDoc.save()
    const createdEmployer = await employerModel.findById(employerDoc._id).select(
      "-password -refreshToken"
    );
    if (!createdEmployer) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(200, createdEmployer, "User registered Successfully")
      );
})


// login employer
 const loginEmployer=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

      if (!email) {
        throw new ApiError(400, " email is required");
      }
   const employer= await employerModel.findOne({email})

   if(!employer){
       throw new ApiError(404, "Employer does not exist");
   }
  const isPasswordValid = await employer.isPasswordCorrect(password);

   if (!isPasswordValid) {
     throw new ApiError(401, "Invalid user credentials");
   }
   
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      employer._id
    );

    const loggedEmployer = await employerModel.findById(employer._id).select("-password -refreshToken");

     const options = {
       httpOnly: true,
       secure: true,
     };

     return res
       .status(200)
       .cookie("accessToken", accessToken, options)
       .cookie("refreshToken", refreshToken, options)
       .json(
         new ApiResponse(
           200,
           {
             // this user used because server send data to fronted
            loggedEmployer,
             accessToken,
             refreshToken,
           },
           "User logged In Successfully"
         )
       );
})

const employerDashboard=asyncHandler(async (req, res) => {
     const totalJobs = await job.countDocuments();
     const totalApplicants = await application.countDocuments();

     const sourceBreakdown = await application.aggregate([
       {
         $group: {
           _id: "$source",
           count: { $sum: 1 },
         },
       },
     ]);

     // ✅ Trend data grouped by date and source
     const applicantTrend = await application.aggregate([
       {
         $group: {
           _id: {
             date: {
               $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
             },
             source: "$source",
           },
           count: { $sum: 1 },
         },
       },
       {
         $project: {
           date: "$_id.date",
           source: "$_id.source",
           count: 1,
           _id: 0,
         },
       },
       {
         $sort: { date: 1 },
       },
     ]);

     res.status(200).json( new ApiResponse(200, {
       totalJobs,
       totalApplicants,
       sourceBreakdown,
       applicantTrend,
     }, "Dashboard data fetched successfully"));
})


export { employerRegisters, loginEmployer, employerDashboard };