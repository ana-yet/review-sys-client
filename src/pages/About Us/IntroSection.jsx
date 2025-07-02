import React from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const IntroSection = () => (
  <motion.section
    className="py-20 px-4 flex flex-col items-start justify-end h-[calc(100vh-40vh)] mt-16 rounded-b-3xl shadow-lg mb-12 text-center bg-[url('https://i.ibb.co/JwPkw34M/pexels-fauxels-3184418.jpg')] bg-no-repeat bg-cover bg-center"
    initial="hidden"
    animate="visible"
    variants={sectionVariants}
  >
    <div className="container  max-w-3xl">
      <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900 ">
        Who We Are
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mx-auto opacity-90 text-white">
        We are a passionate team dedicated to building a transparent and
        reliable review ecosystem. Our mission is to empower consumers with
        genuine insights and help businesses thrive through authentic feedback.
      </p>
    </div>
  </motion.section>
);

export default IntroSection;
