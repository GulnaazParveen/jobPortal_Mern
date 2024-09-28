import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


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
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  // Validate user input
  if ([userName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

 
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  console.log(avatarLocalPath);
  

  const avatarResponse = await uploadOnCloudinary(avatarLocalPath);
  if (!avatarResponse) {
    throw new ApiError(400, "Failed to upload avatar");
  }
  console.log(avatarResponse);
  
  
  const avatarUrl = avatarResponse.secure_url; // Only store URL
   
  // Create new user
  const user = await User.create({
    userName: userName.toLowerCase(),
    email,
    password,
    avatar: avatarUrl,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

// login user
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if (!email) {
      throw new ApiError(400, " email is required");
    }

    const user = await User.findOne({email});

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

    // // here again  find  user  based on userid because initaily user has not refresh token  and we had passed on  user_id  into  this function  that has not refersh token generateAccessAndRefereshTokens(
    //   user._id
    // );  when save refreshtoken into database  now we  need to refreshtoken for sending to coookie   so that's why   we need to update this user object  "user " that will use to sending to cookie or find user based on this user.id  to databased that updated recently
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
            // this user used because server send data to fronted 
             user: loggedInUser,
             accessToken,
             refreshToken,
           },
           "User logged In Successfully"
         )
       );
})

export {registerUser,loginUser}