import mongoose from "mongoose";

const PostSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        caption:{
            type:String
        },
        photos:[{
            type:String,
            required:true
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

const Post=mongoose.model("Post",PostSchema)
export default Post