import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import ContactUs from '../components/ContactUsForm';

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
            <a href="#contribute" className="hover:underline text-xl">
              Contribute
            </a>
            <Link to="/auth" className="hover:underline text-xl">
              Sign Up
            </Link>
            {/* <a href="#contribute" className="hover:underline text-xl">
              Contact Us
            </a> */}
          </div>
        </div>
      </nav>
      <main className="container-fluid mx-auto">
        <section id='about' className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-16 min-h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto text-center">
            <h2 className="text-7xl font-bold mb-8">Navigate Safely, Explore Confidently</h2>
            <h3 className="text-6xl font-bold mb-8">Your Scam-Smart Travel Companion.</h3>
            <Link to="/home" className=" text-xl bg-white text-gray-500 py-5 px-7 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">Get Started</Link>
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
                <div className="flex-col text-start pr-32">
                  <p className='py-3 text-xl' >
                    We are open source and you can contribute to this project on GitHub.
                  </p>
                  <Link to="https://github.com/sruthikkoneti/Share-Your-Journey" className="bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
                    View Repository
                  </Link>
                  <p className='py-3 text-xl text-gray-700' >
                    You can star us on github if you like the project. And feel free to make any Pull Request, Feedback and mentioning bugs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section id='contribute' className="bg-gray-100 py-8 min-h-50vh">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold text-center mb-4 text-gray-700">Contact Us</h2>
            <div className="flex justify-center">
              <ContactUs />
            </div>
          </div>
        </section> */}
      </main>
      <footer className="bg-gradient-to-t from-gray-100 to-gray-100 text-gray-700 py-8 text-center">
        <div className="h-16" /> {/* Spacer for increased height */}
        <div className="grid grid-cols-3 px-16">
          <div className="col-span-1 flex justify-start items-center mb-4">
            <img src="logo.png" width="40" height="40" alt="Logo" className="mr-2" />
            <h3 className="text-lg font-semibold">ShareYourJourney</h3>
          </div>
          <div className="col-span-1 flex justify-center items-center mb-4">
            <h3 className="text-lg font-semibold">Built with</h3>
            <img width="50" height="50" src="https://img.icons8.com/bubbles/50/like.png" alt="like" />
            <h3 className="text-lg font-semibold" >by Sruthik</h3>
          </div>
          <div className="col-span-1 flex justify-end items-center space-x-4">
            <a href="https://github.com/sruthikkoneti" target='_blank' className="text-gray-500 hover:text-blue-300">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-300">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
