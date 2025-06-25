import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaStar, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { nanoid } from "nanoid";

const PlatformStats = ({ statsData }) => {
  const { reviewCount, userCount, serviceCount } = statsData;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: <FaUsers className="text-4xl text-indigo-600" />,
      title: "Users",
      value: userCount,
    },
    {
      icon: <FaStar className="text-4xl text-amber-500" />,
      title: "Reviews",
      value: reviewCount,
    },
    {
      icon: <FaClipboardList className="text-4xl text-emerald-600" />,
      value: serviceCount,
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={nanoid()}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-4 bg-indigo-50 rounded-full">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">
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
    </section>
  );
};

export default PlatformStats;
