import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const barVariants = {
    start: {
      scaleY: 0.5,
    },
    end: {
      scaleY: 1.5,
    },
  };

  const barTransition = {
    duration: 0.4,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  return (
    <div className="h-full w-full flex items-center fixed bg-none justify-center ">
      <motion.div
        className="flex justify-center items-center space-x-2 h-12"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-6 bg-cyan-400 rounded-full origin-bottom"
            style={{ originY: 0.5 }}
            variants={barVariants}
            transition={barTransition}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;
