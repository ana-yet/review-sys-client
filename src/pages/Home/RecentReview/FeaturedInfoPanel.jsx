import {
  FaCommentDots,
  FaStar,
  FaThumbsDown,
  FaThumbsUp,
  FaTools,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../../hook/useAuth";

const FeaturedInfoPanel = ({ stats, latestReview }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const goodReviewPercentage =
    stats.totalReviews > 0 ? (stats.goodReviews / stats.totalReviews) * 100 : 0;

  return (
    <div className="lg:col-span-1 bg-gradient-to-br from-indigo-400 via-indigo-600 to-gray-600 text-white p-8 rounded-2xl shadow-2xl flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center mb-6">
          <FaStar className="text-yellow-300 text-2xl mr-3" />
          <h3 className="text-xl font-bold text-white">Review Snapshot</h3>
        </div>

        <div className="text-center my-4">
          <p className="text-7xl font-bold text-white tracking-tighter">
            {stats.totalReviews}
          </p>
          <p className="text-purple-200 font-medium">Total Client Reviews</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-purple-200">
              User Review by Percentage
            </span>
            <span className="text-sm font-bold text-white">
              {goodReviewPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-teal-300 to-green-400 h-2.5 rounded-full"
              style={{ width: `${goodReviewPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-around bg-black/20 p-4 rounded-lg">
          <div className="text-center">
            <FaThumbsUp className="text-green-400 mx-auto text-2xl mb-1" />
            <p className="text-2xl font-bold">{stats.goodReviews}</p>
            <p className="text-xs text-gray-300">Positive</p>
          </div>
          <div className="text-center">
            <FaThumbsDown className="text-red-400 mx-auto text-2xl mb-1" />
            <p className="text-2xl font-bold">{stats.badReviews}</p>
            <p className="text-xs text-gray-300">Negative</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <h4 className="text-center font-semibold text-purple-200 mb-4">
          Are you looking for a service?
        </h4>
        <div className="flex flex-col gap-3">
          {/* Primary Button for all users */}
          <button
            onClick={() => navigate("/services")}
            className="w-full bg-white text-indigo-700 font-bold py-3 px-6 rounded-lg hover:bg-purple-200 transition-all transform hover:scale-105"
          >
            Browse All Services
          </button>

          {/* Conditional Secondary Button for non-logged-in users */}
          {!user && (
            <button
              onClick={() => navigate("/login")} // Or your signup route
              className="w-full bg-purple-500/40 text-white font-semibold py-3 px-6 rounded-lg border border-purple-400/50 hover:bg-purple-500/60 transition-colors"
            >
              Get Started to Leave a Review
            </button>
          )}
        </div>
      </div>

      {/* ---  Latest Activity Section --- */}
      <div className="mt-auto pt-6 border-t border-white/20">
        <p className="text-xs font-bold uppercase text-purple-200 mb-3">
          Latest Activity
        </p>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full grid place-items-center font-bold text-lg border-2 border-white/50">
            {latestReview.name.charAt(0)}
          </div>

          <div className="text-left">
            {latestReview.rating >= 4 ? (
              <div className="flex items-center gap-1.5 text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full w-fit">
                <FaThumbsUp />
                <span>Positive Feedback</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-semibold bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full w-fit">
                <FaCommentDots />
                <span>New Feedback</span>
              </div>
            )}
            {/* Reviewer and Service */}
            <p className="text-sm text-white font-semibold mt-1">
              <span className="font-bold">{latestReview.name}</span> reviewed "
              <strong>{latestReview.serviceTitle}</strong>"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedInfoPanel;
