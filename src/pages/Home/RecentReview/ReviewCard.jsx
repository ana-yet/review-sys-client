import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();

  // Add default values to prevent errors
  const safeReview = review || {
    name: "User",
    photo: "",
    rating: 0,
    serviceTitle: "Service",
    text: "No review text",
    serviceId: "",
    date: new Date(),
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col h-full">
      <div className="flex items-center mb-3">
        <img
          src={safeReview.photo}
          alt={safeReview.name}
          className="w-10 h-10 rounded-full mr-3 shadow-sm object-cover"
          loading="lazy"
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            {safeReview.name}
          </h4>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${
                  i < safeReview.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              {safeReview.rating}.0
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 my-3"></div>

      <div className="flex-grow">
        <h3 className="font-semibold text-indigo-600 text-sm mb-2 truncate">
          "{safeReview.serviceTitle}"
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
          {safeReview.text}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => navigate(`/services/${safeReview.serviceId}`)}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
        >
          View
        </button>
        <p className="text-xs text-gray-500">
          {new Date(safeReview.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};
export default ReviewCard;
