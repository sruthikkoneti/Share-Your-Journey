import Post from "../models/Post.js"
import fs from 'fs/promises';
import User from "../models/User.js";
import axios from "axios";
import fsExtra from 'fs-extra';
import path from "path";

export const createPost = async (req, res, next) => {
    try {
        const { title, caption, location } = req.body;
        const ownerId = req.user.user_id;
        const lowerCaseLocation = location.toLowerCase()
        const photoUrl = `/file_uploads/${ownerId}/${req.file.filename}`;

        const nominatimApiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(lowerCaseLocation)}`;

        const nominatimResponse = await axios.get(nominatimApiUrl);

        if (nominatimResponse.data.length > 0) {
            const { lat, lon } = nominatimResponse.data[0];

            const newPost = new Post({
                title,
                caption,
                photo: photoUrl,
                location: lowerCaseLocation,
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
                    _id: 1,
                    title: 1,
                    caption: 1,
                    location: 1,
                    coordinateX: 1,
                    coordinateY: 1,
                    photo: 1,
                    upVotes: 1,
                    downVotes: 1,
                    "user.username": 1
                }
            }
        ]);

        res.status(200).json(posts);
    } catch (ex) {
        next(ex);
    }
};

export const getPostsForMap = async (req, res, next) => {
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
                    photo: 1,
                    "user.username": 1
                }
            }
        ]);

        res.status(200).json(posts);
    } catch (ex) {
        next(ex);
    }
}


export const upVoteAPost = async (req, res) => {
    try {
        const { postID } = req.params;
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = await User.findById(req.user.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already upvoted, remove the upvote if they have
        const index = post.upVotes.indexOf(req.user.user_id);
        if (index !== -1) {
            post.upVotes.splice(index, 1);
            user.userUpVotedPosts.pull(postID);
        } else {
            // Add the user's ID to the upVotes array if they haven't upvoted before
            post.upVotes.push(req.user.user_id);

            // If the user has previously downvoted, remove the downvote
            const downvoteIndex = post.downVotes.indexOf(req.user.user_id);
            if (downvoteIndex !== -1) {
                post.downVotes.splice(downvoteIndex, 1);
            }
            user.userUpVotedPosts.push(postID);
        }

        await Promise.all([post.save(), user.save()]);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const downVoteAPost = async (req, res) => {
    try {
        const { postID } = req.params;
        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = await User.findById(req.user.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already downvoted, remove the downvote if they have
        const index = post.downVotes.indexOf(req.user.user_id);
        if (index !== -1) {
            post.downVotes.splice(index, 1);
            user.userDownVotedPosts.pull(postID);
        } else {
            // Add the user's ID to the downVotes array if they haven't downvoted before
            post.downVotes.push(req.user.user_id);

            // If the user has previously upvoted, remove the upvote
            const upvoteIndex = post.upVotes.indexOf(req.user.user_id);
            if (upvoteIndex !== -1) {
                post.upVotes.splice(upvoteIndex, 1);
            }
            user.userDownVotedPosts.push(postID);
        }

        await Promise.all([post.save(), user.save()]);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getPostsByLocation = async (req, res) => {
    try {
        const locationQuery = req.query.location.toLowerCase();

        // Find posts based on the provided location
        const posts = await Post.aggregate([
            {
                $match: { location: locationQuery } // Match based on the provided location
            },
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
                    _id: 1,
                    title: 1,
                    caption: 1,
                    location: 1,
                    coordinateX: 1,
                    coordinateY: 1,
                    photo: 1,
                    upVotes: 1,
                    downVotes: 1,
                    "user.username": 1
                }
            }
        ]);

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


export const deletePost = async (req, res) => {
    try {
        const { postID } = req.params;

        const post = await Post.findById(postID);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const photoPath = path.join(__dirname, '..', post.photo);
        await fsExtra.unlink(photoPath);

        const user = await User.findOneAndUpdate(
            { _id: post.owner },
            { $pull: { posts: postID } }
        );

        await Post.findByIdAndDelete(postID);

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
};

