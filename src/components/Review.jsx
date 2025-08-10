import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaEdit,
  FaUserCircle,
  FaCalendarAlt,
  FaEnvelope,
  FaIdCard,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import useAxiosSecure from "../hook/AxiosSecure";
import axios from "axios";
import LoadingSpinner from "../pages/LoadingSpinner";

const Review = ({ service }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/reviews?id=${service._id}`
      );
      return data;
    },
  });

  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id) => {
    if (!id) {
      return toast.warning(
        "You can't delete your latest review without refresh the page! Please refresh the page!"
      );
    }
    Swal.fire({
      title: "Delete Review?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/review/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
          })
          .catch(() => toast.error("Failed to delete"));
      }
    });
  };

  const handleEdit = (review) => {
    setIsEditing(review._id);
    setEditText(review.text);
    setEditRating(review.rating);
  };

  const saveEdit = (id) => {
    if (!id) {
      return toast.warning("Please reload the page for edit the review!");
    }

    axiosSecure
      .patch(`/review/${id}`, {
        rating: editRating,
        text: editText,
      })
      .then(() => {
        setIsEditing(null);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-500">No reviews yet</h3>
        <p className="mt-2 text-gray-400">Be the first to leave a review!</p>
      </div>
    );
  }

  const renderStars = (rating, interactive = false, setRating = () => {}) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) =>
          interactive ? (
            <button
              key={nanoid()}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              {star <= rating ? (
                <FaStar className="text-yellow-400 text-xl" />
              ) : (
                <FaRegStar className="text-yellow-400 text-xl" />
              )}
            </button>
          ) : star <= rating ? (
            <FaStar key={star} className="text-yellow-400 text-xl" />
          ) : (
            <FaRegStar key={star} className="text-yellow-400 text-xl" />
          )
        )}
      </div>
    );
  };

  if (isLoading && !error) {
    return <LoadingSpinner />;
  }

  if (!isLoading && error) {
    return (
      <div>
        <p className=" text-base text-red-500 font-medium text-center">
          error to fetch data : {error}
        </p>
      </div>
    );
  }

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            What our customers say about our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews?.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="relative">
                      {review.photo ? (
                        <img
                          src={review.photo}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                        />
                      ) : (
                        <FaUserCircle className="text-5xl text-gray-300" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">
                        {review.name || "User Name Unavalilable for Time"}
                      </h3>
                      <div className="flex items-center mt-1">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {review.rating}.0
                        </span>
                      </div>
                    </div>
                  </div>

                  {user.email === review.email && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>

                {isEditing === review._id ? (
                  <div className="mt-4 space-y-4">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-700">Rating:</span>
                      {renderStars(editRating, true, setEditRating)}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setIsEditing(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEdit(review._id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-gray-700 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {review.text}
                  </p>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(review.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <FaEnvelope className="mr-2" />
                    <span>{review.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-500">
              No reviews yet
            </h3>
            <p className="mt-2 text-gray-400">
              Be the first to leave a review!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
