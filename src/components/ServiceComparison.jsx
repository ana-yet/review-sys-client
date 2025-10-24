import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FiX, FiPlus, FiBarChart2 } from "react-icons/fi";

const ServiceComparison = ({ services = [] }) => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);

  // Initialize with first two services if available
  useEffect(() => {
    if (services.length >= 2 && selectedServices.length === 0) {
      setSelectedServices([services[0], services[1]]);
    }
  }, [services]);

  const addServiceToCompare = () => {
    if (
      selectedServices.length < 4 &&
      services.length > selectedServices.length
    ) {
      // Find the first service not already selected
      const availableServices = services.filter(
        (service) =>
          !selectedServices.some((selected) => selected._id === service._id)
      );

      if (availableServices.length > 0) {
        setSelectedServices([...selectedServices, availableServices[0]]);
      }
    }
  };

  const removeServiceFromCompare = (serviceId) => {
    if (selectedServices.length > 2) {
      setSelectedServices(
        selectedServices.filter((service) => service._id !== serviceId)
      );
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-gray-600">({rating?.toFixed(1)})</span>
      </div>
    );
  };

  if (services.length < 2) {
    return (
      <div className="text-center py-10">
        <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Not enough services
        </h3>
        <p className="mt-1 text-gray-500">
          You need at least 2 services to compare them.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Compare Services</h2>
        <button
          onClick={addServiceToCompare}
          disabled={
            selectedServices.length >= 4 ||
            selectedServices.length >= services.length
          }
          className={`flex items-center px-4 py-2 rounded-lg ${
            selectedServices.length >= 4 ||
            selectedServices.length >= services.length
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          <FiPlus className="mr-2" />
          Add Service
        </button>
      </div>

      {selectedServices.length === 0 ? (
        <div className="text-center py-10">
          <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No services selected
          </h3>
          <p className="mt-1 text-gray-500">
            Select services to compare their features.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 w-1/4">Features</th>
                {selectedServices.map((service) => (
                  <th key={service._id} className="p-4 w-1/4 relative">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={service.serviceImage}
                          alt={service.serviceTitle}
                          className="w-16 h-16 object-cover rounded-lg mx-auto"
                        />
                        <button
                          onClick={() => removeServiceFromCompare(service._id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </div>
                      <h3 className="font-semibold mt-2 text-center">
                        {service.serviceTitle}
                      </h3>
                      <p className="text-sm text-gray-500 text-center">
                        {service.companyName}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="p-4 font-medium">Price</td>
                {selectedServices.map((service) => (
                  <td key={service._id} className="p-4 text-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                      ${service.price}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-4 font-medium">Rating</td>
                {selectedServices.map((service) => (
                  <td key={service._id} className="p-4 text-center">
                    {renderStars(service.rating)}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-4 font-medium">Category</td>
                {selectedServices.map((service) => (
                  <td key={service._id} className="p-4 text-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {service.category}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-4 font-medium">Reviews</td>
                {selectedServices.map((service) => (
                  <td key={service._id} className="p-4 text-center">
                    <span className="text-gray-700">
                      {service.reviewCount || 0} reviews
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-4 font-medium">Actions</td>
                {selectedServices.map((service) => (
                  <td key={service._id} className="p-4 text-center">
                    <button
                      onClick={() => navigate(`/services/${service._id}`)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceComparison;
