import { motion } from "framer-motion";
import { nanoid } from "nanoid";

const LoadingSpinner = ({ text = "Loading..." }) => {
  const dots = [0, 1, 2];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 mb-3">
          {dots.map((i) => (
            <motion.div
              key={nanoid()}
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-indigo-500 rounded-full"
            />
          ))}
        </div>
        {text && <p className="text-gray-600 font-medium">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
