import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaPlus,
  FaBars,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import {
  FiHome,
  FiTool,
  FiLogIn,
  FiUserPlus,
  FiList,
  FiStar,
} from "react-icons/fi";
import useAuth from "../hook/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { userSignOut, user, loading } = useAuth();
  // console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSingOut = () => {
    Swal.fire({
      title: "Are you sure you want to sign out?",
      text: "You will be sign out from this website!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        userSignOut()
          .then(() => {
            Swal.fire({
              title: "Logout Successfully!",
              icon: "success",
              draggable: true,
              timer: 1500,
            });
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  if (loading) {
    return <h3 className="text-center">loading</h3>;
  }

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Service<span className="text-indigo-400">Reviews</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" icon={<FiHome className="mr-1" />} text="Home" />
            <NavLink
              to="/all-services"
              icon={<FiTool className="mr-1" />}
              text="Services"
            />
            <NavLink
              to="/about-us"
              icon={<FaUsers className="mr-1" />}
              text="About Us"
            />

            {!user && (
              <>
                {" "}
                <NavLink
                  to="/login"
                  icon={<FiLogIn className="mr-1" />}
                  text="Login"
                />
                <NavLink
                  to="/register"
                  icon={<FiUserPlus className="mr-1" />}
                  text="Register"
                />
              </>
            )}

            {user && (
              <>
                {" "}
                <NavLink
                  to="/add-service"
                  icon={<FaPlus className="mr-1" />}
                  text="Add Service"
                />
                <NavLink
                  to="/my-services"
                  icon={<FiList className="mr-1" />}
                  text="My Services"
                />
                <NavLink
                  to="/my-reviews"
                  icon={<FiStar className="mr-1" />}
                  text="My Reviews"
                />
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex rounded-full items-center text-gray-500 hover:text-blue-600"
                  >
                    {(
                      <img
                        className="overflow-hidden w-10 h-10 rounded-full object-cover"
                        src={user?.photoURL}
                        alt={user.displayName}
                      />
                    ) || <FaUserCircle className="h-6 w-6" />}
                  </Link>
                  <button
                    onClick={handleSingOut}
                    className="flex items-center text-gray-500 hover:text-red-500"
                  >
                    <FaSignOutAlt className="h-5 w-5 mr-1" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink
              to="/"
              icon={<FiHome className="mr-2" />}
              text="Home"
            />
            <MobileNavLink
              to="/all-services"
              icon={<FiTool className="mr-2" />}
              text="Services"
            />

            {!user && (
              <>
                {" "}
                <MobileNavLink
                  to="/login"
                  icon={<FiLogIn className="mr-2" />}
                  text="Login"
                />
                <MobileNavLink
                  to="/register"
                  icon={<FiUserPlus className="mr-2" />}
                  text="Register"
                />
              </>
            )}

            {user && (
              <>
                {" "}
                <MobileNavLink
                  to="/add-service"
                  icon={<FaPlus className="mr-2" />}
                  text="Add Service"
                />
                <MobileNavLink
                  to="/my-services"
                  icon={<FiList className="mr-2" />}
                  text="My Services"
                />
                <MobileNavLink
                  to="/my-reviews"
                  icon={<FiStar className="mr-2" />}
                  text="My Reviews"
                />
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <MobileNavLink
                    to="/profile"
                    icon={<FaUserCircle className="mr-2" />}
                    text="Profile"
                  />
                  <button className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-red-500">
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      {text}
    </Link>
  );
};

const MobileNavLink = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      {text}
    </Link>
  );
};

export default Navbar;
