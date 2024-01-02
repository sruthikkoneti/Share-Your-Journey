import React, { useState } from 'react';
import axios from 'axios';
import { updateProfile } from '../utils/apiRoutes';
import {useNavigate } from 'react-router-dom';
interface ProfileCardProps {
  username: string;
  postCount: number;
  bio?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ username, postCount, bio }) => {
  const navigate=useNavigate()
  const token = localStorage.getItem("token")
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editedBio, setEditedBio] = useState(bio || '');


  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBio(e.target.value);
  };

  const editDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    try {
      const response=await axios.put(updateProfile,{
        bio:editedBio
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setShowEditPanel(false);
      navigate("/home")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6  ml-5 mb-5">
      <h2 className="text-2xl text-black font-semibold mb-2">{username}</h2>
      <p className="text-gray-600">{bio && bio}</p>
      <p className="text-gray-600">Number of Posts: {postCount}</p>
      {showEditPanel ? (
        <form className="mt-4" onSubmit={editDetails}>
          <input
            type="text"
            placeholder="Edit Bio"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={editedBio}
            onChange={handleBioChange}
          />
          <div className="flex justify-between mt-2">
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setShowEditPanel(false)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-600"
          onClick={() => setShowEditPanel(true)}
        >
          Edit Details
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
