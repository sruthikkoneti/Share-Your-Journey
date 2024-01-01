import React from 'react';

const ProfileCard = ({ username, postCount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg opacity-75 p-10 mx-10">
      <h2 className="text-2xl text-black font-semibold mb-2">{username}</h2>
      <p className="text-gray-600">Number of Posts: {postCount}</p>
    </div>
  );
};

export default ProfileCard;
