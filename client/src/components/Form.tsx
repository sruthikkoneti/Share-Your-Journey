import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { newPost } from '../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';

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

      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4 border rounded-md shadow-lg bg-white">
      <h2 className="text-2xl mb-4 text-center text-blue-600">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={createPostData.title}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="caption" className="block mb-1 text-gray-700">
            Caption:
          </label>
          <textarea
            id="caption"
            name="caption"
            value={createPostData.caption}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1 text-gray-700">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={createPostData.location}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="photo" className="block mb-1 text-gray-700">
            Upload Image:
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Upload Post
        </button>
      </form>
    </div>
  );
};

export default Form;
