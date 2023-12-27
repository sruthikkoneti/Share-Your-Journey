import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="bg-blue-200 text-white py-6 px-4 w-full fixed top-0 shadow-md cursor-pointer" onClick={scrollToTop}>
      <div className="container mx-auto text-center">
        <Link to="/" className="text-2xl font-bold text-black text-center">
          ShareYourJourney
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
