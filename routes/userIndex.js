import express from 'express'
import { login, logout, register } from '../controller/userController.js'
import { authorize } from '../helper/auth.js'
// import {authorise} from ''

const userRoutes = express.Router()

userRoutes.post("/register", register)
userRoutes.post("/login", login)
userRoutes.get("/logout", authorize, logout)

export default userRoutes