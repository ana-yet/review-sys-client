import { motion } from "framer-motion";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { emailPasswordLogin, googleLogin, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || "/";

  // console.log(from);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailPasswordLogin(email, password)
      .then(() => {
        navigate(from);

        Swal.fire({
          title: "Registration Successful!",
          text: "Login successfully",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#4f46e5",
          timer: 1500,
          customClass: {
            popup: "rounded-2xl",
            title: "text-2xl font-bold",
            confirmButton: "px-6 py-2 rounded-lg",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch(() => {
        toast.error("Failed to login");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(from);

        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created successfully",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#4f46e5",
          timer: 1500,
          customClass: {
            popup: "rounded-2xl",
            title: "text-2xl font-bold",
            confirmButton: "px-6 py-2 rounded-lg",
          },
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch(() => toast.error("Failed to login!"));
  };

  if (loading) {
    return <h1> loading...</h1>;
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Login | Review System</title>
        <meta
          name="description"
          content="Welcome to the Login of Review System"
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl"
      >
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <Lottie
              animationData={loginAnimation}
              loop={true}
              autoplay={true}
              style={{ width: "100%" }}
            />
          </div>
          <motion.h2
            className="text-2xl font-bold text-white mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome Back!
          </motion.h2>
          <motion.p
            className="text-indigo-100 mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to access your account and reviews
          </motion.p>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
            <p className="text-gray-600 mb-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                Register here
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all hover:shadow-md"
                >
                  Login <FaArrowRight className="ml-2" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium rounded-lg transition-all hover:shadow-sm"
                >
                  <FaGoogle className="text-red-500 mr-3" />
                  Login with Google
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
