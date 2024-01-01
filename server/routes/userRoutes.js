import { Router } from "express";
import { auth } from "../middleware/auth.js"
import { getUserInfo, updateUserProfile} from "../controllers/userController.js";
const router = Router();

//Protected Routes
router.get("/", auth,getUserInfo);
router.put("/update-profile",auth,updateUserProfile)


export default router;