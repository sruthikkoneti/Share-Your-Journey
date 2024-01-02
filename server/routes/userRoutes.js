import { Router } from "express";
import { auth } from "../middleware/auth.js"
import { getUserInfo, updateUserProfile, getUserVotedPosts} from "../controllers/userController.js";
const router = Router();

//Protected Routes
router.get("/", auth,getUserInfo);
router.get("/votes", auth,getUserVotedPosts);
router.put("/update-profile",auth,updateUserProfile)


export default router;