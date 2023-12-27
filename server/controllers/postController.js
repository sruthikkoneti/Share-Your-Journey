import Post from "../models/Post.js"
import fs from 'fs/promises';
import User from "../models/User.js";

export const createPost = async (req, res, next) => {
    try {
        const { title, caption } = req.body;
        const ownerId = req.user.user_id;

        const photoUrl = `/file_uploads/${ownerId}/${req.file.filename}`;

        const newPost = new Post({
            title,
            caption,
            photo: photoUrl,
            owner: ownerId
        });

        const savedPost = await newPost.save();

        const abc=await User.findOneAndUpdate({_id:ownerId}, { $push: { posts: savedPost._id } });
        console.log(abc)

        res.status(201).send(savedPost);
    } catch (ex) {
        next(ex);
    }
};
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        if (!posts) {
            res.status(404).json({ "msg": "No posts found" })
        }
        res.status(201).json(posts);
    } catch (ex) {
        next(ex);
    }
};
