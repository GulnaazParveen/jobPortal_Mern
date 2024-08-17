import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Temporary', 'Contract'],
    default: 'Full-time',
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Internship'],
    default: 'Entry Level',
  },
  jobTitle: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
});

const job = mongoose.model('job', jobSchema);

export default job;
