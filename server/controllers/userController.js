import User from '../models/User';
import Post from '../models/Post';
import fs from 'fs/promises';

export const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.user_id
    const user = await User.findById(userId).populate('posts');
    if (!user) {
      res.status(404).json("User NOT FOUND")
    }
    res.status(200).json(user)
  } catch (ex) {
    console.log(ex)
    next(ex);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { bio } = req.body;
    await User.findByIdAndUpdate(userId, { bio: bio });
    return res.status(200).json({ success: true, message: 'User profile updated successfully.' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Failed to update user profile.' });
  }
};

export const getUserVotedPosts=async(req,res)=>{
  try{
    const userId = req.user.user_id;

    const user = await User.findById(userId).populate('userUpVotedPosts').populate('userDownVotedPosts');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userUpVotedPosts = user.userUpVotedPosts.map(post => post._id);
    const userDownVotedPosts = user.userDownVotedPosts.map(post => post._id);

    res.status(200).json({ userUpVotedPosts, userDownVotedPosts });
  }catch(error){

  }
}
