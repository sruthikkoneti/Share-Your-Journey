import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="bg-green text-white py-3 lg:py-6 lg:px-20 fixed w-full bg-gradient-to-r from-green-500 to-blue-500" onClick={scrollToTop}>
      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center">
          <img src="/logo.png" width="40" height="40" alt="" className="mr-2" />
          <Link to="/home" className="text-lg font-bold lg:text-3xl">
            ShareYourJourney
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
