import { Router } from "express";
const router = Router();
import {
  createJob,
  findAllJobs,
} from "../controllers/job.controller.js";

router.route("/createJob").post(createJob);
router.route("/findAllJob").get(findAllJobs);

export default router;
