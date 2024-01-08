import React, { useState } from "react";
import "../index.css"
import { Link } from 'react-router-dom';

const LandingNav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLinkClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  return (
    <>
      <nav className="fixed w-full bg-white opacity-75 py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center justify-start">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 md:h-10 w-8 md:w-10 mr-2"
            />
            <div className="text-black font-bold text-xl md:text-3xl">ShareYourJourney</div>
          </div>
          <button
            onClick={toggleMenu}
            className="block md:hidden text-black hover:text-gray-300 focus:outline-none"
          >
            {showMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
          <ul className="hidden md:flex space-x-4 text-lg md:text-xl">
            <li>
              <a onClick={() => handleLinkClick('about')} className="text-black hover:text-gray-300 cursor-pointer">About</a>
            </li>
            <li>
              <a onClick={() => handleLinkClick('contribute')} className="text-black hover:text-gray-300 cursor-pointer">Contribute</a>
            </li>
            <li>
              <Link to="/auth" className="text-black hover:text-gray-300 cursor-pointer">Signup/Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`fixed top-0 left-0 h-screen w-full flex items-center justify-center z-50 ${showMenu ? 'backdrop-filter backdrop-blur-md' : 'hidden'}`}>
        <div className={`text-black w-3/4 bg-white-100 rounded-lg p-6 ${showMenu ? '' : 'hidden'}`} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="text-center">
            <button onClick={closeMenu} className="text-black hover:text-gray-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <a onClick={() => handleLinkClick('about')} className="text-black hover:text-gray-300 mb-6 cursor-pointer block text-lg px-4 py-2">About</a>
            <a onClick={() => handleLinkClick('contribute')} className="text-black hover:text-gray-300 mb-6 cursor-pointer block text-lg px-4 py-2">Contribute</a>
            <Link to="/auth" className="text-black hover:text-gray-300 mb-6 cursor-pointer block text-lg px-4 py-2">Signup/Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingNav;