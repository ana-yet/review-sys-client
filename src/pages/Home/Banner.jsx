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

  // Preload images for better performance
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
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
            opacity: { duration: 0.3 },
          }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              className="px-4 md:px-6 text-white max-w-4xl text-center"
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              <motion.h1
                variants={textItemVariants}
                className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
              >
                {headline}
              </motion.h1>
              <motion.p
                variants={textItemVariants}
                className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              >
                {subtext}
              </motion.p>
              <motion.div variants={textItemVariants}>
                <Link
                  to={ctaLink}
                  className="inline-block px-6 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full z-20 backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full z-20 backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={nanoid()}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-4 md:w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
