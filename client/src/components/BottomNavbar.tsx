import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaPlus, FaSignOutAlt, FaMap } from 'react-icons/fa'; // Import Flat Color Icons

const BottomNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-transparent">
      <ul className="flex justify-around items-center h-16 bg-blue-500 text-white">
        <li>
          <Link to="/user" className="flex flex-col items-center text-xl">
            <FaUser />
          </Link>
        </li>
        <li>
          <Link to="/map" className="flex flex-col items-center text-xl">
            <FaMap />
          </Link>
        </li>
        <li>
          <Link to="/create" className="flex flex-col items-center text-xl">
            <FaPlus />
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="flex flex-col items-center text-xl">
            <FaSignOutAlt />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavbar;
