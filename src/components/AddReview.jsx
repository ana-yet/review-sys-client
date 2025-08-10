import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAuth from "../hook/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../pages/LoadingSpinner";
import useAxiosSecure from "../hook/AxiosSecure";

const AddReview = ({ service }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();

  const handleSubmit = () => {
    if (!user) {
      toast.warning("Login required!");
      navigate("/login", { state: { from: location?.pathname } });
      return;
    }
    if (!reviewText || rating === 0) return;

    const newReview = {
      text: reviewText,
      rating: rating,
      date: new Date().toISOString(),
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,
      serviceId: service._id,
      serviceTitle: service.serviceTitle,
    };

    // console.log("Review submitted:", newReview);

    axiosSecure
      .post("/review", newReview)
      .then(() => {
        setReviewText("");
        setRating(0);
        setHover(null);
        toast.success("Review Added Successfully!");
      })
      .catch(() => toast.error("Unable to add review"));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className=" max-w-7xl mx-auto p-4 bg-white shadow-md rounded my-10">
      <h2 className="text-xl font-semibold mb-2">Add Your Review</h2>

      <div className="mb-4">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full h-28 p-2 border rounded resize-none focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4 flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              type="button"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none"
            >
              <FaStar
                className={`h-6 w-6 transition-colors duration-200 ${
                  starValue <= (hover || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!reviewText || rating === 0}
        className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Add Review
      </button>
    </div>
  );
};

export default AddReview;
