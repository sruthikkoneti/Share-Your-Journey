import Post from "../models/Post.js"
import fs from 'fs/promises';

export const createPost = async (req, res, next) => {
    try {
        const { title, caption } = req.body;
        const ownerId = req.user.user_id; 

        const photoUrls = req.files.map((file) => `/file_uploads/${ownerId}/${file.filename}`);

        const newPost = new Post({
            title,
            caption,
            photos: photoUrls,
            owner: ownerId
        });

        const savedPost = await newPost.save();

        res.status(201).send(savedPost);
    } catch (ex) {
        next(ex);
    }
};
export const getAllPosts = async (req, res, next) => {
    try {
        const posts=await Post.find();
        if(!posts){
            res.status(404).json({"msg":"No posts found"})
        }
        res.status(201).json(posts);
    } catch (ex) {
        next(ex);
    }
};
