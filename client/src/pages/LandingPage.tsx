import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import LandingNav from '../components/LandingNav';

const LandingPage: React.FC = () => {
  return (
    <div className="">
      <LandingNav/>
      <main className="container-fluid mx-auto">
        <section id='about' className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-16 min-h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl lg:text-7xl font-bold mb-4 lg:mb-8">Navigate Safely, Explore Confidently</h2>
            <h3 className="text-3xl lg:text-6xl font-bold mb-4 lg:mb-8">Your Scam-Smart Travel Companion.</h3>
            <Link to="/home" className="text-lg lg:text-xl bg-white text-gray-500 py-3 lg:py-5 px-5 lg:px-7 rounded-full font-semibold hover:bg-blue-100 transition duration-300">Get Started</Link>
          </div>
        </section>
        <section className="bg-gray-100 py-6 lg:py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4 text-gray-700">What are we made of?</h2>
            <div className="flex flex-wrap justify-center items-center py-8 lg:py-16">
              <img src="Bun.svg" alt="" className="w-16 h-16 lg:w-24 lg:h-24 mx-4 my-2" />
              <img src="JavaScript.svg" alt="" className="w-16 h-16 lg:w-24 lg:h-24 mx-4 my-2" />
              <img src="vite.svg" alt="" className="w-16 h-16 lg:w-24 lg:h-24 mx-4 my-2" />
              <img src="TypeScript.svg" alt="" className="w-16 h-16 lg:w-24 lg:h-24 mx-4 my-2" />
              <img src="Express.svg" alt="" className="w-16 h-16 lg:w-24 lg:h-24 mx-4 my-2" />
              <img src="MongoDB.svg" alt="" className="w-16 h-16 lg:w-24 lg:h-24 mx-4 my-2" />
            </div>
          </div>
        </section>
        <section id='contribute' className="bg-gray-100 py-6 lg:py-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4 text-gray-700">Hey Developers</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className='flex justify-center lg:justify-end'>
                <img src="github.svg" width="200" height="200" alt="github" className="lg:w-400 lg:h-400" />
              </div>
              <div className='col-span-1 lg:col-span-2 flex justify-center lg:justify-start items-center'>
                <div className="lg:pr-32 lg:text-starts md:text-start text-center lg:mx-0 md:mx-0 mx-6">
                  <p className='py-3 text-base lg:text-xl'>
                    We are open source and you can contribute to this project on GitHub.
                  </p>
                  <a href="https://github.com/sruthikkoneti/Share-Your-Journey" className="bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-base lg:text-xl">
                    View Repository
                  </a>
                  <p className='py-3 text-base lg:text-xl text-gray-700'>
                    You can star us on GitHub if you like the project. Feel free to make any Pull Request, give feedback, and report bugs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-t from-gray-100 to-gray-100 text-gray-700 py-6 lg:py-8 text-center">
        <div className="h-16 lg:h-24" />
        <div className="grid grid-cols-1 lg:grid-cols-3 px-4 lg:px-16">
          <div className="flex justify-center lg:justify-start items-center mb-4 lg:mb-0">
            <img src="logo.png" width="40" height="40" alt="Logo" className="mr-2" />
            <h3 className="text-base lg:text-lg font-semibold">ShareYourJourney</h3>
          </div>
          <div className="flex justify-center lg:justify-center items-center mb-4 lg:mb-0">
            <h3 className="text-base lg:text-lg font-semibold">Built with</h3>
            <img width="40" height="40" src="https://img.icons8.com/bubbles/50/like.png" alt="like" className="mx-2 lg:mx-3" />
            <h3 className="text-base lg:text-lg font-semibold">by Sruthik</h3>
          </div>
          <div className="flex justify-center lg:justify-end items-center space-x-4">
            <a href="https://github.com/sruthikkoneti" target='_blank' className="text-gray-500 hover:text-blue-300">
              <FaGithub />
            </a>
            <a href="https://twitter.com/sruthik042" className="text-gray-500 hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/sruthik042" className="text-gray-500 hover:text-blue-300">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/sruthik-koneti/" className="text-gray-500 hover:text-blue-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
