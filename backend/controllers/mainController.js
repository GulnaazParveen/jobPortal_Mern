import job from "../models/createJob.js";
class JobPortal {
  static createJob = async (req, res) => {
    try {
      console.log("Request body:", req.body);

      const {
        name,
        email,
        phone,
        companyName,
        companyLogo,
        employmentType,
        experienceLevel,
        jobTitle,
        location,
        jobDescription
      } = req.body;

      if (!name || !email || !phone || !companyName || !companyLogo || !jobTitle || !location || !jobDescription) {
        return res.status(400).json({ error: "All required fields must be provided." });
      }

      const newJob = new job({
        name,
        email,
        phone,
        companyName,
        companyLogo,
        employmentType,
        experienceLevel,
        jobTitle,
        location,
        jobDescription
      });

      await newJob.save();

      console.log("Job posted successfully");
      res.status(201).json({ message: "Job posted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Job is not added successfully" });
    }
  }

 static findJob = async (req, res) => {
  try {
    const foundJobs = await job.find();
    res.status(200).json(foundJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};


}

export default JobPortal;
