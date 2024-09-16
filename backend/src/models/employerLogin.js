import mongoose, { mongo } from "mongoose";
const employerSchema = new mongoose.Schema({
  employerId: {
    type: String, // Keep this as a String
    require: true,
  },
  EmployerName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  EmployerPhotoUrl: {
    type: String,
    require: true,
  },
});

const employerModel=mongoose.model('employer',employerSchema)
export default employerModel;