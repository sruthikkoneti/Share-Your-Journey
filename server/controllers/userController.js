import User from '../models/User';
import Post from '../models/Post';
import fs from 'fs/promises';

export const getUserInfo = async (req, res, next) => {
    try {
        const userId=req.user.user_id
        const user = await User.findById(userId).populate('posts');
        if(!user){
          req.status(404).json("User NOT FOUND")
        }
        res.status(200).json(user) 
      } catch (ex) {
        console.log(ex)
        next(ex);
      }
};
