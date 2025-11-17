import express from 'express'
import { login, register } from '../controller/userController.js'
import { add, apply_job, get_job_list, get_job_reach } from '../controller/jobPostController.js'
import { authorize } from '../helper/auth.js'

const jobPostRoutes = express.Router()

jobPostRoutes.post("/add", authorize, add)
jobPostRoutes.post("/fetch_job_reach", authorize, get_job_reach)

//candiddate applyer 
jobPostRoutes.get("/apply_job", authorize, apply_job)

//candiddate fetch alljob
jobPostRoutes.get("/get_job_list", get_job_list)

jobPostRoutes.get("/get_job_list_applied",authorize, get_job_list)

export default jobPostRoutes