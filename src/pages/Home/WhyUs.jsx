import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { FiCheckCircle, FiSearch, FiStar } from "react-icons/fi";

const WhyUs = () => {
  const features = [
    {
      icon: <FiCheckCircle className="text-3xl text-indigo-600" />,
      title: "Verified Reviews",
      description:
        "Every review goes through our verification process to ensure authenticity and prevent fake feedback.",
    },
    {
      icon: <FiSearch className="text-3xl text-indigo-600" />,
      title: "Powerful Search",
      description:
        "Find exactly what you're looking for with our advanced filtering and search capabilities.",
    },
    {
      icon: <FiStar className="text-3xl text-indigo-600" />,
      title: "Rating System",
      description:
        "Our 5-star rating system helps you quickly assess service quality at a glance.",
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8  mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div>
                <img
                  src="https://i.ibb.co/5hjcs36B/manlibrary.jpg"
                  alt="img"
                  className="w-full h-auto max-w-md"
                  animate={floatingAnimation}
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <FiStar className="text-yellow-400 text-2xl" />
              </motion.div>
              <motion.div
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-md z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
              >
                <FiCheckCircle className="text-green-500 text-2xl" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Why People Love Our{" "}
              <span className="text-indigo-400">Platform</span>
            </h2>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={nanoid()}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
