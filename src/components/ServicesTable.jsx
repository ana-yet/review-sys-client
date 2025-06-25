import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import UpdateServiceModal from "./UpdateServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import { useState } from "react";
import { nanoid } from "nanoid";

const ServicesTable = ({ services, setServices }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const numericRating = parseFloat(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= numericRating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-gray-500">
          ({numericRating.toFixed(1)})
        </span>
      </div>
    );
  };

  const handleUpdate = (updatedService) => {
    setServices(
      services.map((service) =>
        service._id === updatedService._id ? updatedService : service
      )
    );
  };

  const handleDelete = (serviceId) => {
    setServices(services.filter((service) => service._id !== serviceId));
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Added Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {services.map((service) => (
                <motion.tr
                  key={nanoid()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={service.serviceImage}
                      alt={service.serviceTitle}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {service.serviceTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {service.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ${service.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatDate(service.addedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStars(service.rating)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setIsUpdateModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 hover:scale-110 transition-all"
                      >
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-900 hover:scale-110 transition-all"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {selectedService && (
        <>
          <UpdateServiceModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            service={selectedService}
            onUpdate={handleUpdate}
          />

          <DeleteServiceModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            service={selectedService}
            onDelete={handleDelete}
          />
        </>
      )}
    </>
  );
};

export default ServicesTable;
