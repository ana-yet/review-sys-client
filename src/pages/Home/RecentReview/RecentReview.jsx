import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import FeaturedInfoPanel from "./FeaturedInfoPanel";

const FeaturedPanelSkeleton = () => (
  <div className="lg:col-span-1 bg-gray-800 p-6 rounded-2xl shadow-lg animate-pulse flex flex-col justify-center text-center h-full">
    <div className="w-12 h-12 bg-gray-600 rounded-full mx-auto mb-4"></div>
    <div className="h-6 bg-gray-600 rounded w-3/4 mx-auto mb-3"></div>
    <div className="h-3 bg-gray-600 rounded w-full mx-auto mb-2"></div>
    <div className="h-3 bg-gray-600 rounded w-5/6 mx-auto mb-4"></div>
    <div className="h-10 bg-gray-600 rounded-lg w-1/2 mx-auto"></div>
  </div>
);

const StandardCardSkeleton = () => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
      <div className="flex-1">
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-1/2 my-4"></div>
    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
  </div>
);

const RecentReviews = () => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentReviews"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/latest-review`
      );
      return data;
    },
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
    cacheTime: 1000 * 60 * 5, // Keep in cache for 5 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <FeaturedPanelSkeleton />
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <StandardCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg max-w-2xl mx-auto">
        Error fetching reviews: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Latest <span className="text-indigo-600">Reviews</span>
        </h2>
        <div className="w-20 h-1 bg-indigo-600 rounded-full mx-auto mt-4"></div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Unfiltered opinions from the front lines - fresh takes on today's services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <FeaturedInfoPanel
          stats={reviews?.stats}
          latestReview={reviews?.latestReviews[0]}
        />

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.latestReviews?.slice(1).map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentReviews;