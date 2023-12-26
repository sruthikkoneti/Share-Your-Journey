import { Router } from "express";
import { auth } from "../middleware/auth.js"
import { getUserInfo } from "../controllers/userController.js";
const router = Router();

//Protected Routes
router.get("/", auth,getUserInfo);



export default router;