import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="">
      <nav className="bg-white text-black py-6 lg:px-20 fixed w-full bg-opacity-75">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center">
            <img src="logo.png" width="40" height="40" alt="" className="mr-2" />
            <Link to="/" className="text-4xl font-bold mb-4 lg:mb-0 lg:mr-6">
              ShareYourJourney
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <a href="#about" className="hover:underline text-xl">
              About
            </a>
            <a href="#about" className="hover:underline text-xl">
              Why Us?
            </a>
            <a href="#contribute" className="hover:underline text-xl">
              Contribute
            </a>
            <Link to="/auth" className="hover:underline text-xl">
              Sign Up
            </Link>
            <a href="#contribute" className="hover:underline text-xl">
              Contact Us
            </a>
          </div>
        </div>
      </nav>
      <main className="container-fluid mx-auto">
        <section id='about' className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-16 min-h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto text-center">
            <h2 className="text-7xl font-bold mb-8">Navigate Safely, Explore Confidently</h2>
            <h3 className="text-6xl font-bold mb-8">Your Scam-Smart Travel Companion.</h3>
            <Link to="/auth" className=" text-xl bg-white text-blue-500 py-5 px-7 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">Get Started</Link>
          </div>
        </section>
        <section className="bg-gray-100 py-8 min-h-50vh">
          <div className="container mx-auto">
            <h2 className="text-5xl font-bold text-center mb-4 text-gray-700">What are we made of?</h2>
            <div className="flex justify-center items-center py-16">
              <img src="Bun.svg" alt="" className="w-24 h-24 mx-4" />
              <img src="JavaScript.svg" alt="" className="w-24 h-24 mx-4" />
              <img src="vite.svg" alt="" className="w-24 h-24 mx-4" />
              <img src="TypeScript.svg" alt="" className="w-24 h-24 mx-4" />
              <img src="Express.svg" alt="" className="w-24 h-24 mx-4" />
              <img src="MongoDB.svg" alt="" className="w-24 h-24 mx-4" />
            </div>
          </div>
        </section>
        <section id='contribute' className="bg-gray-100 py-8 min-h-50vh">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold text-center mb-4 text-gray-700">Hey Developers</h2>
            <div className="grid grid-cols-3 mx-auto">
              <div className='col-span-1 flex justify-end'>
                <img src="github.svg" width="400" height="400" alt="github" />
              </div>
              <div className='col-span-2 flex justify-start items-center'>
                <div className="flex-col text-start pr-10">
                  <p className='py-3 text-xl' >
                    We are open source and you can contribute to this project on GitHub.
                    We are using the GNU license so you can use this project for your own use as well.
                  </p>
                  <Link to="https://github.com/sruthikkoneti/Share-Your-Journey" className="bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
                    View Repository
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
