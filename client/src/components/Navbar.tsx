import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 px-4 w-full fixed top-0 shadow-md cursor-pointer" onClick={scrollToTop}>
      <div className="container mx-auto text-center">
        <Link to="/home" className="text-2xl font-bold text-white text-center">
          ShareYourJourney
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
