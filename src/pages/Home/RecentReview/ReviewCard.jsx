import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="flex items-center mb-3">
        <img
          src={review.photo}
          alt={review.name}
          className="w-12 h-12 rounded-full mr-4 shadow-sm"
        />
        <div>
          <h4 className="font-bold text-gray-800">{review.name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              {review.rating}.0/5.0
            </span>
          </div>
        </div>
      </div>

      <div className="border-t my-4"></div>

      <div className="flex-grow">
        <h3 className="font-semibold text-indigo-600 text-md mb-2">
          "{review.serviceTitle}"
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => navigate(`/services/${review.serviceId}`)}
          className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-bold rounded-full hover:bg-gray-100 transition-colors"
        >
          View Service
        </button>
        <p className="text-xs text-gray-500">
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};
export default ReviewCard;
