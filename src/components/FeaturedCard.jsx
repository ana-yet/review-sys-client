import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const FeaturedCard = ({ dat }) => {
  const navigate = useNavigate();

  const {
    serviceImage,
    serviceTitle,
    price,
    _id,
    rating,
    reviewCount,
    companyName,
  } = dat;

  const isTopRated = rating === 5 && reviewCount > 0;

  return (
    <div className="relative flex flex-col bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full group border border-gray-100">
      {isTopRated && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full z-10 flex items-center gap-1 shadow-sm">
          <FaStar className="text-amber-700" />
          <span className="tracking-wide">Top Rated</span>
        </div>
      )}

      <div className="flex-shrink-0 overflow-hidden">
        <img
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
          src={serviceImage}
          alt={`Image for ${serviceTitle}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/eeeeee/cccccc?text=Image+Not+Found";
          }}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <img
              className="w-6 h-6 rounded-full mr-2 object-cover"
              src={`https://ui-avatars.com/api/?name=${companyName}&background=random`}
              alt={`${companyName} logo`}
            />
            <span className="text-xs font-medium text-gray-500 truncate">
              {companyName}
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight truncate">
            {serviceTitle}
          </h3>

          <div className="flex items-center mb-3">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 h-3 ${i < rating ? "fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-gray-700 text-xs font-medium ml-1">
              {rating?.toFixed(1)}
            </span>
            <span className="text-gray-500 text-xs ml-2">
              ({reviewCount || 0})
            </span>
          </div>
        </div>

        {/* Price and Details Button */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="text-lg font-bold text-gray-900">${price}</div>
          <button
            onClick={() => navigate(`/services/${_id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none transition-all duration-300 transform hover:scale-105"
          >
            Details
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeaturedCard;