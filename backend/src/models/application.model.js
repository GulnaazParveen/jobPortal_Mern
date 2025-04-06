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
  },
  { timestamps: true }
);

const application=mongoose.model("Application", applicantionSchema);
export default application;