import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {service.serviceImage ? (
        <img
          src={service.serviceImage}
          alt={service.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {service.serviceTitle}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded whitespace-nowrap">
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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {service.category}
          </span>

          <button
            onClick={() => navigate(`/services/${service._id}`)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            See Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
