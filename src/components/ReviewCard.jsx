import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router";
import { nanoid } from "nanoid";

const ReviewCard = ({ review }) => {
  const { _id, photo, name, date, rating, text, serviceTitle, serviceId } =
    review;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={photo}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{serviceTitle}</h3>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mb-4 text-gray-800">"{text}"</p>

      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <AiFillStar
            key={nanoid()}
            className={`h-5 w-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <Link
        to={`/services/${serviceId}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        View Review
      </Link>
    </motion.div>
  );
};

export default ReviewCard;
