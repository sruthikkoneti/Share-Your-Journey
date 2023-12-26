import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Register = async (req, res, next) => {
    try {
        const { username, password} = req.body
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            username,
            password:hashedPassword
        })
        res.status(200).json(newUser)
    } catch (ex) {
        next(ex);
    }
}

export const Login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(404).json({ msg: "User does not exist. " })
        } 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials. " })
        }
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {expiresIn: 60*60});

        return res.status(200).json({ token, user_id: user._id })
    } catch (ex) {
        next(ex);
    }
}

export const verifyUser = async(req, res, next) => {
    try {
        res.status(200).send({msg: "user valid"});
    } catch (ex) {
        next(ex);
    }
}