import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className=""> {/* Adjust padding for larger screens */}
      <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6">
        <div className="container-fluid mx-auto flex flex-col lg:flex-row justify-between items-center lg:px-20">
          <Link to="/" className="text-4xl font-bold mb-4 lg:mb-0 lg:mr-6">
            ShareYourJourney
          </Link>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <Link to="/" className="hover:underline">
              About
            </Link>
            <Link to="/" className="hover:underline">
              Features
            </Link>
            <Link to="/" className="hover:underline">
              Contribute
            </Link>
            <Link to="/" className="hover:underline">
              Section 4
            </Link>
            <Link to="/auth" className="hover:underline">
              Sign Up
            </Link>
            {/* Add more navbar links as needed */}
          </div>
        </div>
      </nav>

      <main className="container-fluid mx-auto py-8">
        <section className="bg-white py-8 min-h-50vh">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Section 1</h2>
            <p className="text-lg text-center">
              This is the first section with a white background.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-8 min-h-50vh">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Section 2</h2>
            <p className="text-lg text-center">
              This is the second section with a gradient background.
            </p>
          </div>
        </section>

        <section className="bg-white py-8 min-h-50vh">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Section 3</h2>
            <p className="text-lg text-center">
              This is the third section with a white background.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-8 min-h-50vh">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Section 4</h2>
            <p className="text-lg text-center">
              This is the fourth section with a gradient background.
              <img
                width="375"
                height="375"
                src="https://img.icons8.com/3d-fluency/375/github.png"
                alt="github"
              />
            </p>
          </div>
        </section>
        {/* ... Additional sections */}
      </main>
    </div>
  );
};

export default LandingPage;
