import React from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router";

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
    <div className="relative flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full group">
      {isTopRated && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-300 to-amber-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1 shadow-md border border-amber-200/50">
          <FaStar className="text-amber-700 drop-shadow-sm" />
          <span className="tracking-wider">Top Rated</span>
        </div>
      )}

      <div className="flex-shrink-0 overflow-hidden">
        <img
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          src={serviceImage}
          alt={`Image for ${serviceTitle}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/eeeeee/cccccc?text=Image+Not+Found";
          }}
        />
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex-grow">
          <div className="flex items-center mb-3">
            <img
              className="w-8 h-8 rounded-full mr-3 object-cover"
              src={`https://ui-avatars.com/api/?name=${companyName}&background=random`}
              alt={`${companyName} logo`}
            />
            <span className="text-sm font-medium text-gray-500">
              {companyName}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
            {serviceTitle}
          </h3>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-800 font-bold ml-1">
              {rating?.toFixed(1)}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {/* --- Price and Details Button --- */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div className="text-xl font-bold text-gray-900">${price}</div>
          <button
            onClick={() => navigate(`services/${_id}`)}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          >
            Details
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeaturedCard;
