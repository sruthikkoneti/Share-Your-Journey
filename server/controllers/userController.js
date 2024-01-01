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

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.user_id;
    if (!name && !req.file) {
      return res.status(400).json({ success: false, message: 'Name or profile image is required for update.' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (name) {
      user.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    if (req.file) {
      if (user.profile_image) {
        await fsExtra.remove(user.profile_image);
      }

      const newProfileImagePath = req.filePath;
      user.profile_image = newProfileImagePath;
    }

    await user.save();

    return res.status(200).json({ success: true, message: 'User profile updated successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update user profile.' });
  }
};
