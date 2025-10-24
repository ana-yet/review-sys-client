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

  // Add default values to prevent errors
  const safeStats = stats || { totalReviews: 0, goodReviews: 0, badReviews: 0 };
  const safeReview = latestReview || { name: "User", serviceTitle: "Service", rating: 0 };

  const goodReviewPercentage =
    safeStats.totalReviews > 0 ? (safeStats.goodReviews / safeStats.totalReviews) * 100 : 0;

  return (
    <div className="lg:col-span-1 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center mb-6">
          <FaStar className="text-yellow-300 text-xl mr-2" />
          <h3 className="text-lg font-bold text-white">Review Snapshot</h3>
        </div>

        <div className="text-center my-4">
          <p className="text-5xl font-bold text-white tracking-tight">
            {safeStats.totalReviews}
          </p>
          <p className="text-purple-200 font-medium text-sm">Total Reviews</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-purple-200">
              Positive Reviews
            </span>
            <span className="text-sm font-bold text-white">
              {goodReviewPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-300 to-green-400 h-2 rounded-full"
              style={{ width: `${goodReviewPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-around bg-black/10 p-3 rounded-lg">
          <div className="text-center">
            <FaThumbsUp className="text-green-400 mx-auto text-lg mb-1" />
            <p className="text-xl font-bold">{safeStats.goodReviews}</p>
            <p className="text-xs text-gray-300">Positive</p>
          </div>
          <div className="text-center">
            <FaThumbsDown className="text-red-400 mx-auto text-lg mb-1" />
            <p className="text-xl font-bold">{safeStats.badReviews}</p>
            <p className="text-xs text-gray-300">Negative</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <h4 className="text-center font-semibold text-purple-200 mb-3 text-sm">
          Looking for a service?
        </h4>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/all-services")}
            className="w-full bg-white text-indigo-700 font-semibold text-sm py-2.5 px-4 rounded-lg hover:bg-purple-100 transition-all"
          >
            Browse Services
          </button>

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-purple-500/30 text-white font-medium text-sm py-2.5 px-4 rounded-lg border border-purple-400/40 hover:bg-purple-500/40 transition-colors"
            >
              Leave a Review
            </button>
          )}
        </div>
      </div>

      {/* Latest Activity Section */}
      <div className="mt-auto pt-4 border-t border-white/20">
        <p className="text-xs font-bold uppercase text-purple-200 mb-2">
          Latest Review
        </p>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold text-sm border border-white/30">
            {safeReview.name.charAt(0)}
          </div>

          <div className="text-left">
            {safeReview.rating >= 4 ? (
              <div className="flex items-center gap-1 text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full w-fit">
                <FaThumbsUp className="text-xs" />
                <span>Positive</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs font-semibold bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full w-fit">
                <FaCommentDots className="text-xs" />
                <span>New</span>
              </div>
            )}
            <p className="text-xs text-white font-medium mt-1 truncate">
              <span className="font-bold">{safeReview.name}</span> reviewed "
              <strong>{safeReview.serviceTitle}</strong>"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedInfoPanel;