import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {

  const navigate=useNavigate()
  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate("/auth")
  };

  return (
    <aside className="bg-gray-900 text-white h-screen w-100 mx-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block hover:text-gray-300">Profile</a>
          </li>
          <li>
            <a href="#" className="block hover:text-gray-300">Share</a>
          </li>
          <li>
            <a href="#" className="block hover:text-gray-300">Settings</a>
          </li>
          <li>
            <button onClick={handleLogout} className="block hover:text-gray-300 w-full text-left">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
