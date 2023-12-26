import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { uploadPost } from "../middleware/fileUpload.js";
import { auth } from "../middleware/auth.js"
const router = Router();

//Protected Routes
router.post("/create", [auth, uploadPost], createPost);
router.get("/", auth,getAllPosts);



export default router;