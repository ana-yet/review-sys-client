import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaPlus,
  FaImage,
  FaBuilding,
  FaGlobe,
  FaTag,
  FaDollarSign,
  FaFileAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import LoadingSpinner from "../pages/LoadingSpinner";
import useAxiosSecure from "../hook/AxiosSecure";
import { Helmet } from "react-helmet-async";

const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceImage: "",
    serviceTitle: "",
    companyName: "",
    website: "",
    description: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      serviceImage,
      serviceTitle,
      companyName,
      website,
      description,
      category,
      price,
    } = formData;
    if (
      !serviceImage ||
      !serviceTitle ||
      !companyName ||
      !website ||
      !description ||
      !category ||
      !price
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      toast.error("Price must be a positive number.");
      return false;
    }

    try {
      new URL(website);
    } catch (e) {
      toast.error("Please enter a valid website URL.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newService = {
      ...formData,
      addedDate: new Date().toLocaleString(),
      userEmail: user?.email,
      rating: 0,
      reviewCount: 0,
    };

    // console.log("Submitting Service:", newService);

    try {
      axiosSecure
        .post("/allServices", newService)
        .then(() => {
          navigate("/my-services");
          Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true,
            timer: 1500,
          });

          setFormData({
            serviceImage: "",
            serviceTitle: "",
            companyName: "",
            website: "",
            description: "",
            category: "",
            price: "",
          });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto mt-14 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Helmet>
        <title>Add Service | Review System</title>
        <meta
          name="description"
          content="Welcome to the homepage of Add service"
        />
      </Helmet>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaPlus className="text-blue-600" />
          Add New Service
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="serviceImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FaImage className="inline-block mr-2 text-gray-500" />
              Service Image URL
            </label>
            <input
              type="text"
              id="serviceImage"
              name="serviceImage"
              value={formData.serviceImage}
              onChange={handleChange}
              placeholder="e.g., https://example.com/service.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div>
            <label
              htmlFor="serviceTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Title
            </label>
            <input
              type="text"
              id="serviceTitle"
              name="serviceTitle"
              value={formData.serviceTitle}
              onChange={handleChange}
              placeholder="e.g., Web Design Services"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FaBuilding className="inline-block mr-2 text-gray-500" />
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Creative Solutions Inc."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FaGlobe className="inline-block mr-2 text-gray-500" />
              Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="e.g., https://www.creativesolutions.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FaFileAlt className="inline-block mr-2 text-gray-500" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Provide a detailed description of the service..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out resize-y"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FaTag className="inline-block mr-2 text-gray-500" />
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out bg-white"
              required
            >
              <option value="">Select a category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Consulting">Consulting</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FaDollarSign className="inline-block mr-2 text-gray-500" />
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 299.99"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 pt-2">
            <div>
              <label className="block font-medium mb-1">Added Date:</label>
              <p className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200">
                {new Date().toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block font-medium mb-1">User Email:</label>
              <p className="px-4 py-2 bg-gray-50 rounded-md border border-gray-200">
                {user?.email || "N/A"}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaPlus className="mr-2" />
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
