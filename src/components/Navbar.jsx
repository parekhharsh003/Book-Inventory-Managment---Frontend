import React, { useEffect, useState } from "react";
import { FaXmark, FaBars, FaBarsStaggered, FaBlog } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleOptionClick = (option) => {
    console.log(`Selected option: ${option}`);
    togglePopup(); // Close the popup after selecting an option
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/home" },
    { link: "Shop", path: "/shop" },
    { link: "Blog", path: "/blog" },
    { link: "Cart", path: "/cart" },
  ];

  return (
    <header
      className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300"
      style={{ zIndex: 1000 }}
    >
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <Link
            to="/home"
            className="text-2xl font-bold text-blue-700 flex items-center gap-2"
          >
            <FaBlog className="inline-block" />
            Books
          </Link>

          <ul className="md:flex space-x-12 hidden navitems">
            {navItems.map(({ link, path }) => (
              <Link
                key={link}
                to={path}
                className="link block text-base cursor-pointer uppercase text-black hover:text-blue-700"
              >
                {link}
              </Link>
            ))}
          </ul>

          <div className="flex space-x-12 items-center">
            {/* Logout Button */}
            <div>
              <button
                onClick={() => {
                  // Handle logout logic here
                  navigate("/login");
                }}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="text-black hover:text-blue-700"
                />
              </button>
            </div>

            <div>
              <button>
                <FaBarsStaggered className="w-5 hover:text-blue-700" />
              </button>
            </div>
          </div>

          {/* Toggle Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <a
              href={path}
              key={link}
              onClick={toggleMenu}
              className="block text-white hover:text-gray-500"
            >
              {link}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
