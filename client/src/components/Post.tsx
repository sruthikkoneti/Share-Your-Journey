import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';
import { downVote, upVote } from '../utils/apiRoutes';
import { Types } from 'mongoose';

interface PostProps {
  postID: Types.ObjectId;
  title: string;
  photo: string;
  caption: string;
  location: string;
  user?: {
    username: string;
  };
  userUpVotedPosts: Types.ObjectId[];
  userDownVotedPosts: Types.ObjectId[];
}

const Post: React.FC<PostProps> = ({ postID, title, photo, caption, location, user, userUpVotedPosts, userDownVotedPosts, }) => {
  const postId = postID;
  const userUpVotedArray:Types.ObjectId[]=userUpVotedPosts
  const userDownVotedArray:Types.ObjectId[]=userDownVotedPosts
  const upBool:Boolean=userUpVotedArray.includes(postId)
  const downBool:Boolean=userDownVotedArray.includes(postId)
  const [upvoted, setUpvoted] = useState(upBool);
  const [downvoted, setDownvoted] = useState(downBool);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleUpVote = async () => {
    const upVoteURL = `${upVote}${postId}`;

    if (!upvoted) {
      try {
        await axios.put(upVoteURL, {}, config);
        setUpvoted(true);
        setDownvoted(false);
      } catch (error) {
        console.error('Error upvoting:', error);
      }
    } else {
      try {
        await axios.put(upVoteURL, {}, config);
        setUpvoted(false);
      } catch (error) {
        console.error('Error resetting upvote:', error);
      }
    }
  };

  const handleDownVote = async () => {
    const downVoteURL = `${downVote}${postId}`;

    if (!downvoted) {
      try {
        await axios.put(downVoteURL, {}, config);
        setDownvoted(true);
        setUpvoted(false);
      } catch (error) {
        console.error('Error downvoting:', error);
      }
    } else {
      try {
        await axios.put(downVoteURL, {}, config);
        setDownvoted(false);
      } catch (error) {
        console.error('Error resetting downvote:', error);
      }
    }
  };
  const capitalizeWords = (input: string) => {
    return input
      .toLowerCase()
      .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
  };

  useEffect(() => {
    setUpvoted(userUpVotedPosts.includes(postID));
  }, [userUpVotedPosts, postID]);

  return (
    <div className="bg-gradient-to-r from-white-50 to-white-75 bg-opacity-50 rounded-lg shadow-md p-10 mb-4">
      <div className="mb-2 font-semibold">{title}</div>
      <img src={`http://localhost:5000${photo}`} alt="Post" className="rounded-md mb-2 w-full" />
      <div>{caption}</div>
      <div className="mt-2 flex items-center">
        <FaMapMarkerAlt className="mr-2" />
        <span>{capitalizeWords(location)}</span>
      </div>
      {user && (
        <div>
          <strong>Posted by:</strong> {user.username}
        </div>
      )}
      <div className="flex gap-2">
        <FaThumbsUp
          className={`mr-2 cursor-pointer ${upvoted ? 'text-green-500' : ''}`}
          onClick={handleUpVote}
        />
        <FaThumbsDown
          className={`mr-2 cursor-pointer ${downvoted ? 'text-red-500' : ''}`}
          onClick={handleDownVote}
        />
      </div>
    </div>
  );
};

export default Post;
