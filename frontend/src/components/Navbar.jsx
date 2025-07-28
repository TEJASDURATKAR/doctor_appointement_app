import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoChevronDownSharp } from "react-icons/io5";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/Context";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { token, setToken,userData } = useContext(AppContext); // ✅ Correct


  const dropdownRef = useRef(null);

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
    setMobileMenu(false);
  };

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 text-black border-b border-gray-700">
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.UaylOLPMn1PSNOnOEU_VdgHaHa&pid=Api&P=0&h=220"
          alt="Logo"
          className="h-10 w-10 mr-2 rounded-full"
        />
        <span className="text-xl font-semibold">Priscripto</span>
      </div>

      <ul className="hidden md:flex gap-6">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contacts" },
          { name: "All Doctors", path: "/doctors" },
        ].map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`relative ${
                location.pathname === link.path ? "text-blue-500" : ""
              } hover:text-blue-500`}
            >
              {link.name}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="md:hidden flex items-center">
        <img
          className="w-8 cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        />
      </div>

      {/* Profile / Login button */}
      <div className="relative hidden md:flex" ref={dropdownRef}>
        {token && userData ? (
  <div
    className="flex items-center gap-2 cursor-pointer"
    onClick={() => setShowMenu(!showMenu)}
  >
    <img
      src={userData.image || "https://via.placeholder.com/150"}
      alt="Profile"
      className="h-10 w-10 rounded-full"
    />
    <IoChevronDownSharp
      className={`text-gray-500 transition-transform ${
        showMenu ? "rotate-180" : ""
      }`}
    />
  </div>
) : (
  <button
    onClick={() => navigate("/login")}
    className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
  >
    Create Account
  </button>
)}


        {showMenu && (
          <div className="absolute top-12 right-0 w-60 bg-white shadow-lg rounded-md border border-gray-200 z-10">
            <ul>
              <li onClick={() => handleNavigation("/my-profile")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li onClick={() => handleNavigation("/my-appointenent")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                My Appointment
              </li>
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-300 md:hidden z-50">
          <ul className="flex flex-col items-center gap-4 py-4">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contacts" },
              { name: "All Doctors", path: "/doctors" },
            ].map((link) => (
              <li key={link.path} onClick={() => handleNavigation(link.path)}>
                <span
                  className={`block px-4 py-2 text-lg ${
                    location.pathname === link.path ? "text-blue-500" : ""
                  } hover:text-blue-500 cursor-pointer`}
                >
                  {link.name}
                </span>
              </li>
            ))}
            {token ? (
              <>
                <li onClick={() => handleNavigation("/my-profile")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li onClick={() => handleNavigation("/my-appointenent")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My Appointment
                </li>
                <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
                >
                  Create Account
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
