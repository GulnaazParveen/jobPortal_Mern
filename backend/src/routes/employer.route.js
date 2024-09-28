import { Router } from "express";
const router = Router();

import { employerRegisters ,loginEmployer} from "../controllers/emloyerController.js";


router.route('/registerEmployer').post(employerRegisters)
router.route('/loginEmployer').post(loginEmployer)

export default router;
