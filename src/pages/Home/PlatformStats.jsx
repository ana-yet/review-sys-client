import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaStar, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PlatformStats = ({ statsData }) => {
  const { reviewCount, userCount, serviceCount } = statsData || {};

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      title: "Users",
      value: userCount || 0,
    },
    {
      icon: <FaStar className="text-3xl text-amber-500" />,
      title: "Reviews",
      value: reviewCount || 0,
    },
    {
      icon: <FaClipboardList className="text-3xl text-emerald-600" />,
      value: serviceCount || 0,
      title: "Services",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-4 p-3 bg-indigo-50 rounded-full">
              {stat.icon}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  delay={index * 0.2}
                />
              ) : (
                0
              )}
              <span className="text-indigo-600">+</span>
            </h3>
            <p className="text-lg text-gray-600">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlatformStats;