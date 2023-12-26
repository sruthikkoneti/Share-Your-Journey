import React from 'react';

interface PostProps {
  title: string;
  photo: string;
  caption: string;
}

const Post: React.FC<PostProps> = ({ title, photo, caption }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="mb-2 font-semibold">{title}</div>
      <img src={`http://localhost:5000${photo}`} alt="Post" className="rounded-md mb-2 w-full" />
      <div>{caption}</div>
    </div>
  );
};

export default Post;
