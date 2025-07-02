import React from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const OurMission = () => (
  <motion.section
    className="py-16 px-4 bg-white rounded-xl shadow-sm mx-4 md:mx-auto max-w-6xl mb-12"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={sectionVariants}
  >
    <div className="container mx-auto text-center max-w-4xl">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Mission</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.div
          className="text-3xl  flex-shrink-0"
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <i className="fas fa-lightbulb"></i>
        </motion.div>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-left md:text-center">
          Our core purpose is to foster trust and transparency in the digital
          marketplace. We provide a platform where every voice matters, ensuring
          that consumers have access to unbiased, real-world experiences, and
          businesses can leverage constructive feedback for continuous
          improvement and growth.
        </p>
      </div>
    </div>
  </motion.section>
);

export default OurMission;
