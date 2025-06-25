import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { nanoid } from "nanoid";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scaleX: 0.1,
      transformOrigin: "left",
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.5,
      },
    }),
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
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white"
            >
              Service<span className="text-indigo-400">Reviews</span>
            </motion.div>
            <motion.p variants={itemVariants} className="text-gray-400">
              Honest reviews for quality services
            </motion.p>
          </motion.div>

          <motion.nav variants={itemVariants}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <motion.li
                  key={nanoid()}
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <motion.span whileHover={{ x: 4 }} className="inline-block">
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect With Us
            </h3>
            <motion.div className="flex space-x-4">
              {socialIcons.map((social, i) => (
                <motion.a
                  key={nanoid()}
                  variants={socialVariants}
                  custom={i}
                  href="#"
                  aria-label={social.name}
                  className="text-gray-400 hover:text-white text-xl transition-colors"
                  whileHover={{
                    y: -4,
                    scale: 1.2,
                    color: "#818cf8",
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-gray-800 text-center text-sm text-gray-500"
        >
          © {new Date().getFullYear()} ReviewService. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
