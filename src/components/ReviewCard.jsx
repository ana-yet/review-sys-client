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
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 mb-6 border border-gray-100"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={photo}
          alt={name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{serviceTitle}</h3>
          <p className="text-sm text-gray-500">
            Reviewed by {name} • {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mb-4 text-gray-700 italic">"{text}"</p>

      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={nanoid()}
              className={`h-5 w-5 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-gray-600 font-medium">{rating}/5</span>
      </div>

      <div className="flex items-center justify-between">
        <Link
          to={`/services/${serviceId}`}
          className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
        >
          View Service Details
        </Link>
        <div className="text-sm text-gray-500">
          Review ID: {_id.slice(0, 8)}...
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;