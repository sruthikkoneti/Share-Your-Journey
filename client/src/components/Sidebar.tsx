import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMap, FiEdit, FiLogOut } from 'react-icons/fi'; // Import icons from react-icons

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/auth");
  };

  return (
    <div className="max-w-md rounded overflow-hidden bg-white shadow-md rounded-lg opacity-75 p-10 mx-10">
      <div className="px-6 py-4">
        <div className="text-gray-700 text-base">
          <ul className="space-y-2">
            <li>
              <Link to="/user" className="hover:text-blue-600 flex items-center">
                <FiUser className="mr-2" /> Profile
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-blue-600 flex items-center">
                <FiMap className="mr-2" /> Map View
              </Link>
            </li>
            <li>
              <Link to="/create" className="hover:text-blue-600 flex items-center">
                <FiEdit className="mr-2" /> Create
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-blue-600 flex items-center w-full text-left focus:outline-none">
                <FiLogOut className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
