import mongoose from 'mongoose';
const applicantionSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    source: {
      type: String,
      enum: ["CompanyWebsite", "Referral", "SocialMedia", "Email", "JobBoards"],
      default: "CompanyWebsite",
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },  
    linkedin: {
      type: String,
    },
  },
  { timestamps: true }
);

const application=mongoose.model("Application", applicantionSchema);
export default application;