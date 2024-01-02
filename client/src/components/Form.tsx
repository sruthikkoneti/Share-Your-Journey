import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { newPost } from '../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiImage, FiMapPin } from 'react-icons/fi'; // Import icons from react-icons

interface CreatePostData {
  title: string;
  caption: string;
  photo: File | null;
  location: string;
}

const Form: React.FC = () => {
  const [createPostData, setCreatePostData] = useState<CreatePostData>({
    title: '',
    caption: '',
    photo: null,
    location: '',
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreatePostData({
      ...createPostData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      setCreatePostData({
        ...createPostData,
        photo: imageFile,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', createPostData.title);
      formData.append('caption', createPostData.caption);
      formData.append('location', createPostData.location);
      if (createPostData.photo) {
        formData.append('photo', createPostData.photo);
      }

      const response = await axios.post(newPost, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setCreatePostData({
        title: '',
        caption: '',
        photo: null,
        location: '',
      });

      navigate('/home');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="flex justify-center ml-5 p-1">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl mb-4 text-center text-purple-600">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mx-1">
          <div className="flex items-center border rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 bg-transparent">
            <FiEdit className="mr-2" />
            <input
              type="text"
              id="title"
              name="title"
              value={createPostData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full focus:outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center border rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 bg-transparent">
            <FiEdit className="mr-2" />
            <textarea
              id="caption"
              name="caption"
              value={createPostData.caption}
              onChange={handleChange}
              placeholder="Caption"
              className="w-full focus:outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center border rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 bg-transparent">
            <FiMapPin className="mr-2" />
            <input
              type="text"
              id="location"
              name="location"
              value={createPostData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full focus:outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center border rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 bg-transparent">
            <FiImage className="mr-2" />
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full focus:outline-none bg-transparent"
            />
          </div>
          <button type="submit" className="bg-purple-500 text-white px-4 rounded-md hover:bg-purple-600">
            Upload Post
          </button>
        </form>
      </div>
    </div>

  );
};

export default Form;
