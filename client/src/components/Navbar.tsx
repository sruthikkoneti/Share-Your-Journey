import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-200 text-white py-6 px-4 w-full fixed top-0 shadow-md">
      <div className="container mx-auto">
        <div className="text-2xl font-bold text-black text-center">ShareYourJourney</div>
      </div>
    </nav>
  );
};

export default Navbar;
