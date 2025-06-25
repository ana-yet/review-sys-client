import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/AxiosSecure";

const UpdateServiceModal = ({ isOpen, onClose, service, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    serviceTitle: "",
    category: "",
    price: "",
    serviceImage: "",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        serviceTitle: service.serviceTitle,
        category: service.category,
        price: service.price,
        serviceImage: service.serviceImage,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure
      .patch("/my-service", {
        _id: service._id,
        ...formData,
      })
      .then(() => {
        onUpdate({ ...service, ...formData });
        onClose();
        Swal.fire({
          title: "Updated Successfully!",
          icon: "success",
          draggable: true,
          timer: 1500,
        });
      })
      .catch(() => {
        toast.error("Failed to update!!");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 1 : 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Update Service</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Title
            </label>
            <input
              type="text"
              name="serviceTitle"
              value={formData.serviceTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="serviceImage"
              value={formData.serviceImage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateServiceModal;
