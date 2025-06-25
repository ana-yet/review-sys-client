import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/AxiosSecure";

const DeleteServiceModal = ({ isOpen, onClose, service, onDelete }) => {
  const axiosSecure = useAxiosSecure();
  const handleDelete = () => {
    axiosSecure
      .delete("/my-service", {
        data: { _id: service._id },
      })
      .then(() => {
        onDelete(service._id);
        onClose();
        Swal.fire({
          title: "Service deleted!",
          icon: "success",
          draggable: true,
          timer: 1500,
        });
      })
      .catch(() => {
        toast.error("Delete Unsuccessful!");
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
        initial={{ y: -20 }}
        animate={{ y: isOpen ? 0 : -20 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Delete Service</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{service?.serviceTitle}</span>? This
          action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteServiceModal;
