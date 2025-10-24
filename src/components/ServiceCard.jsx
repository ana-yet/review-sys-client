import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {service.serviceImage ? (
        <div className="relative">
          <img
            src={service.serviceImage}
            alt={service.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {service.serviceTitle}
          </h3>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shadow-md">
            ${service.price}
          </span>
        </div>

        <div className="mt-2 flex items-center">
          <span className="text-gray-500 text-sm truncate">
            {service.companyName}
          </span>
        </div>

        <p className="mt-3 text-gray-600 line-clamp-2 h-12">
          {service.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800">
            {service.category}
          </span>

          <button
            onClick={() => navigate(`/services/${service._id}`)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center group"
          >
            See Details
            <span className="ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Rating and review count */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-700 font-medium">
              {service.rating?.toFixed(1)}
            </span>
            <span className="ml-1 text-gray-500 text-sm">
              ({service.reviewCount || 0})
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Added: {new Date(service.addedDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
