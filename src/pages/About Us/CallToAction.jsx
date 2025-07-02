import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const CallToAction = () => (
  <motion.section
    className="py-20 px-4 bg-white text-white text-center rounded-xl shadow-lg mx-4 md:mx-auto max-w-6xl mb-12"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={sectionVariants}
  >
    <h2 className="text-3xl text-gray-900 font-bold mb-6">
      Ready to Experience Trust?
    </h2>
    <p className="text-lg  max-w-3xl text-gray-500 mx-auto mb-8 opacity-90">
      Join our community today to share your voice or discover genuine insights
      from others.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          className="bg-indigo-400 text-white  font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-300 hover:scale-105 transition-all duration-300"
          to="/all-services"
        >
          Write a Review
        </Link>
      </motion.button>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          className="bg-transparent border-2 border-indigo-400 text-indigo-400  font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-400 hover:text-white hover:scale-105 transition-all duration-300"
          to="/all-services"
        >
          Explore Reviews
        </Link>
      </motion.button>
    </div>
  </motion.section>
);

export default CallToAction;
