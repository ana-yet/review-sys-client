import { motion } from "framer-motion";
import { FiSearch, FiStar, FiEdit } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const steps = [
    {
      icon: <FiSearch className="text-2xl" />,
      title: "Browse Services",
      description: "Discover thousands of services in our extensive directory.",
    },
    {
      icon: <FiStar className="text-2xl" />,
      title: "Read Real Reviews",
      description: "Get honest opinions from verified customers.",
    },
    {
      icon: <FiEdit className="text-2xl" />,
      title: "Share Your Experience",
      description: "Help others by contributing your own reviews.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How It <span className="text-indigo-600">Works</span>
        </h2>
        <div className="w-20 h-1 bg-indigo-600 rounded-full mx-auto mt-4"></div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Get the most out of our service review platform in just three simple
          steps.
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 mb-6 mx-auto"
            >
              {step.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 text-center">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
