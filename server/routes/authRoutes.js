import express from "express"
import {Register, Login,} from '../controllers/authController.js'

const router = express.Router()

router.post("/register",Register)
router.post("/login",Login)
// router.post("/verify", auth, verifyUser)


export default router