import React, { useEffect } from "react";
import { FaStar, FaRegStar, FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const ServiceDetailsCard = ({ service }) => {
  const {
    _id,
    serviceImage,
    serviceTitle,
    companyName,
    website,
    description,
    category,
    price,
    addedDate,
    rating,
    reviewCount,
  } = service;

  useEffect(() => {
    toast.info(`Viewing details for ${serviceTitle}`);
  }, [serviceTitle]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-7xl w-full mx-auto md:flex">
        <div className="md:w-1/2">
          <img
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            src={serviceImage}
            alt={serviceTitle}
          />
        </div>
        <div className="md:w-1/2 p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {serviceTitle}
            </h1>
            <span className="bg-indigo-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase">
              {category}
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-4">
            {companyName}
          </p>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-500">
              {renderStars(rating)}
            </div>
            <span className="text-gray-600 ml-2">({reviewCount} reviews)</span>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">${price}</p>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 flex items-center"
            >
              Visit Website <FaExternalLinkAlt className="ml-2" />
            </a>
            <p className="text-sm text-gray-500">Added on: {addedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsCard;
