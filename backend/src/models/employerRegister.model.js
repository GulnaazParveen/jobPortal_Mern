import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return v.toString().length === 10;
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
      }
    },
    Address:{
        type:String,
        required:true,  
    },
    EmployerPostJobs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job"
    },
  refreshToken: {
    type: String,
  },
},{timestamps:true});


employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// method is creating so that i can call function at logic time
employerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

employerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      mobileNumber:this.mobileNumber,
      Address:this.Address,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

employerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const employerModel=mongoose.model('Employer',employerSchema)
export default employerModel;