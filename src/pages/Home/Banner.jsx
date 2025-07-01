import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { nanoid } from "nanoid";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const slideData = [
  {
    id: 1,
    image: "https://i.ibb.co/1Jjg7Mkf/review.jpg",
    headline: "Trusted Reviews, Real People",
    subtext: "Find or review services you care about.",
    cta: "Explore Services",
    ctaLink: "/all-services",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co/fztppYp8/evaluation-feedback-customer-smiley-response.jpg",
    headline: "Share Your Experience",
    subtext: "Help others make informed decisions.",
    cta: "Write a Review",
    ctaLink: "/all-services",
  },
  {
    id: 3,
    image: "https://i.ibb.co/gLZcrNxD/customer-service-faqs-illustration.jpg",
    headline: "Discover Quality Services",
    subtext: "Find the best providers in your area.",
    cta: "Browse Categories",
    ctaLink: "/all-services",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      delay,
      staggerChildren: 0.2,
    },
  }),
};

const textItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Banner = ({ slides = slideData, autoPlayInterval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useInterval(() => {
    if (!isPaused) {
      nextSlide();
    }
  }, autoPlayInterval);

  const { id, image, headline, subtext, cta, ctaLink } = slides[currentSlide];

  return (
    <div
      className="relative w-full h-[calc(100vh-35vh)] mt-16 overflow-hidden mb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="w-full h-full bg-black/50 flex items-center justify-center">
            <motion.div
              className="px-6 text-white max-w-2xl text-center"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              <motion.h1
                variants={textItemVariants}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                {headline}
              </motion.h1>
              <motion.p
                variants={textItemVariants}
                className="text-xl md:text-2xl mb-8"
              >
                {subtext}
              </motion.p>
              <motion.div variants={textItemVariants}>
                <Link
                  to={ctaLink}
                  className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium text-lg transition-colors shadow-lg"
                >
                  {cta}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={nanoid()}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
