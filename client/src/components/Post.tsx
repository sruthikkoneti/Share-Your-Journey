import React from 'react';
import { FaMapMarkerAlt, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

interface PostProps {
  title: string;
  photo: string;
  caption: string;
  location: string;
  user: {
    username: string;
  };
}

const Post: React.FC<PostProps> = ({ title, photo, caption, location, user }) => {

  const handleUpVote = () => {
    // Logic for upvoting
    // Add your functionality here
  };

  const handleDownVote = () => {
    // Logic for downvoting
    // Add your functionality here
  };

  return (
    <div className="bg-gradient-to-r from-white-50 to-white-75 bg-opacity-50 rounded-lg shadow-md p-10 mb-4">
      <div className="mb-2 font-semibold">{title}</div>
      <img src={`http://localhost:5000${photo}`} alt="Post" className="rounded-md mb-2 w-full" />
      <div>{caption}</div>
      <div className="mt-2 flex items-center">
        <FaMapMarkerAlt className="mr-2" /> {/* Location icon */}
        <span>{location}</span>
      </div>
      {
        user && <div>
          <strong>Posted by:</strong> {user && user.username}
        </div>
      }
      <div className="flex gap-2">
        <FaThumbsUp className="mr-2 cursor-pointer" onClick={handleUpVote} /> {/* Upvote icon/button */}
        <FaThumbsDown className="mr-2 cursor-pointer" onClick={handleDownVote} /> {/* Downvote icon/button */}
      </div>

    </div>
  );
};

export default Post;
