import { Router } from "express";
const router = Router();
import { upload } from "../middlewares/multer.middleware.js";

// importing route
import { createJob, findAllJobs ,findJobsByEmployerId} from "../controllers/job.controller.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

//declaratoin exact route
router.route("/postjob").post(createJob);
router.route("/getjob").get(findAllJobs);
router.route("/employer/:employerId/jobs").get(findJobsByEmployerId);
router.route("/registerUser").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      file: "assests",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
export default router;
