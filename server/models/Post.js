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
        photo:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        coordinateX:{
            type:String
        },
        coordinateY:{
            type:String
        },
        upVotes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        downVotes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

const Post=mongoose.model("Post",PostSchema)
export default Post