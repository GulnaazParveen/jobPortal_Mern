import express from "express"
const router=express.Router()
import jobportal from "../controllers/mainController.js"

router.post('/postjob',jobportal.createJob)
router.get("/getjob",jobportal.findJob)
export default router