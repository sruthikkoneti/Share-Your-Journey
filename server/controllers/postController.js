import Post from "../models/Post.js"
import fs from 'fs/promises';
import User from "../models/User.js";
import axios from "axios";

export const createPost = async (req, res, next) => {
    try {
        const { title, caption, location } = req.body;
        const ownerId = req.user.user_id;

        const photoUrl = `/file_uploads/${ownerId}/${req.file.filename}`;

        const nominatimApiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

        const nominatimResponse = await axios.get(nominatimApiUrl);

        if (nominatimResponse.data.length > 0) {
            const { lat, lon } = nominatimResponse.data[0];

            const newPost = new Post({
                title,
                caption,
                photo: photoUrl,
                location,
                coordinateX: lat.toString(),
                coordinateY: lon.toString(),
                owner: ownerId
            });

            const savedPost = await newPost.save();

            await User.findOneAndUpdate(
                { _id: ownerId },
                { $push: { posts: savedPost._id } }
            );

            res.status(201).json(savedPost);
        } else {
            res.status(404).json({ error: 'Location not found' });
        }
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

export const getPostsForMap = async (req, res,next) => {
    console.log("clicked")
    try {
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user" // Deconstruct the user array
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    caption: 1,
                    location: 1,
                    coordinateX: 1,
                    coordinateY: 1,
                    "user.username": 1 
                }
            }
        ]);

        res.status(200).json(posts);
    } catch (ex) {
        next(ex);
    }
}
