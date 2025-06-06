import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  avatar: {
    type: String, 
    required: true,
  },
  application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userApplication",
    },
  ],
  refreshToken:{
    type:String
  }
},{timestamps:true});

// buildtin  middleware use before saving document so that we can perform  password encrypttion 
userSchema.pre('save', async function(next){
  if (!this.isModified("password")) return next();
 
       this.password = await bcrypt.hash(this.password, 10);
       next();
})

// method is creating so that i can call function at logic time
userSchema.methods.isPasswordCorrect=async function(password){
      return  await  bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.userName,
      avatar:this.avatar
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User=mongoose.model('User',userSchema)
export default User