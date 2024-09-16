import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";


const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
const registerUser=asyncHandler(async (req,res)=>{
     const { userName,email,password}=req.body;

     if([userName,email,password].some((field)=>field?.trim()==="")){
            throw new ApiError(400, "All fields are required");
     }

     const existedUser = await User.findOne(email);

     if (existedUser) {
       throw new ApiError(409, "User with email already exists");
     }
     const avatarLocalPath = req.files?.avatar[0]?.path;
     if(!avatarLocalPath){
          throw new ApiError(400, "Avatar file is required");
     }
    
       const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
          throw new ApiError(400, "Avatar file is required");
        }
   
        
    const user = await User.create({
      username: userName.toLowerCase(),
      email,
      password,
      avatar: avatar.url,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
})

// login user
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if (!email) {
      throw new ApiError(400, " email is required");
    }

    const user = await User.findOne(email);

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

     const loggedInUser = await User.findById(user._id).select(
       "-password -refreshToken"
     );

     const options = {
       httpOnly: true,
       secure: true,
     };

     return res
       .status(200)
       .cookie("accessToken", accessToken, options)
       .cookie("refreshToken", refreshToken, options)
       .json(
         new ApiResponse(200,
           {
             user: loggedInUser,
             accessToken,
             refreshToken,
           },
           "User logged In Successfully"
         )
       );
})

export {registerUser,loginUser}