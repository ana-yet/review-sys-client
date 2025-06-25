import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import errorAnimation from "../assets/error.json";
import { FiArrowLeft } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      <Helmet>
        <title>Error 404 | Review System</title>
        <meta
          name="description"
          content="Welcome to the error of Review System"
        />
      </Helmet>
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.9, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mx-auto mb-6"
        >
          <Lottie
            animationData={errorAnimation}
            loop={true}
            autoplay={true}
            style={{ height: 250 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition-all"
          >
            <FiArrowLeft className="mr-2" />
            Return Home
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
