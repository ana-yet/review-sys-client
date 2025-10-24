import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
      },
    }),
    hover: {
      y: -5,
      scale: 1.1,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/all-services" },
    { name: "My Services", path: "/my-services" },
    { name: "Reviews", path: "/my-reviews" },
    { name: "Profile", path: "/profile" },
  ];

  const socialIcons = [
    { icon: <FaFacebook />, name: "Facebook" },
    { icon: <FaTwitter />, name: "Twitter" },
    { icon: <FaLinkedin />, name: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white"
            >
              Service<span className="text-indigo-400">Reviews</span>
            </motion.div>
            <motion.p variants={itemVariants} className="text-gray-400 max-w-md">
              Honest reviews for quality services. Helping you make informed decisions with trusted feedback from real users.
            </motion.p>
          </motion.div>

          <motion.nav variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Connect With Us
            </h3>
            <motion.div className="flex space-x-5">
              {socialIcons.map((social, i) => (
                <motion.a
                  key={i}
                  variants={socialVariants}
                  custom={i}
                  href="#"
                  aria-label={social.name}
                  className="text-gray-400 hover:text-white text-xl transition-colors"
                  whileHover="hover"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500"
        >
          © {new Date().getFullYear()} ServiceReviews. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;