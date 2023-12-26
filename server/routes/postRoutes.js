import { Router } from "express";
import { createPost } from "../controllers/postController.js";
import { uploadPost } from "../middleware/fileUpload.js";
import { auth } from "../middleware/auth.js"
const router = Router();

//Protected Routes
router.post("/create", [auth, uploadPost], createPost);



export default router;