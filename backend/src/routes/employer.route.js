import { Router } from "express";
const router = Router();

import { employerDashboard, employerRegisters ,loginEmployer} from "../controllers/emloyerController.js";
import { findJobsByEmployerId, getJobByIdAndIncrementViews, getViewsByDepartment } from "../controllers/job.controller.js";

router.route('/registerEmployer').post(employerRegisters)
router.route('/loginEmployer').post(loginEmployer)
router.route("/employer/:employerId").get(findJobsByEmployerId);
router.route("/view/:id").get(getJobByIdAndIncrementViews)
router.route("/viewByDepartment").get(getViewsByDepartment);
router.route("/stats").get(employerDashboard);
export default router;
