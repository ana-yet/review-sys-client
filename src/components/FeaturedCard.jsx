import React from "react";
import { Navigate, useNavigate } from "react-router";

const FeaturedCard = ({ dat }) => {
  const navigate = useNavigate();
  const { serviceImage, serviceTitle, description, price, _id } = dat;

  return (
    <div className="flex flex-col  bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300  hover:shadow-2xl">
      <div className="flex-shrink-0">
        <img
          className="w-full h-48 object-cover"
          src={serviceImage}
          alt={`Image for ${serviceImage}`}
        />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {serviceTitle}
          </h3>
          <p className="text-gray-600 text-base">{description}</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-2xl font-bold text-indigo-600">${price}</div>
          <button
            onClick={() => navigate(`services/${_id}`)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
