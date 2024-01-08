import { Router } from "express";
import { createPost, deletePost, downVoteAPost, getAllPosts, getPostsByLocation, getPostsForMap, upVoteAPost } from "../controllers/postController.js";
import { uploadPost } from "../middleware/fileUpload.js";
import { auth } from "../middleware/auth.js"
const router = Router();

//Protected Routes
router.post("/create", [auth, uploadPost], createPost);
router.get("/", auth,getAllPosts);
router.get("/map",auth,getPostsForMap)
router.put("/up-vote/:postID",auth,upVoteAPost)
router.put("/down-vote/:postID",auth,downVoteAPost)
router.get("/get-posts",auth,getPostsByLocation)
router.delete("/delete-post/:postID",auth,deletePost)

export default router;