import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import FeaturedInfoPanel from "./FeaturedInfoPanel";

const FeaturedPanelSkeleton = () => (
  <div className="lg:col-span-1 bg-gray-800 p-8 rounded-2xl shadow-lg animate-pulse flex flex-col justify-center text-center h-full">
    <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4"></div>
    <div className="h-8 bg-gray-600 rounded w-3/4 mx-auto mb-3"></div>
    <div className="h-4 bg-gray-600 rounded w-full mx-auto mb-2"></div>
    <div className="h-4 bg-gray-600 rounded w-5/6 mx-auto mb-6"></div>
    <div className="h-12 bg-gray-600 rounded-lg w-1/2 mx-auto"></div>
  </div>
);

const StandardCardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-1/2 my-6"></div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
  </div>
);

const RecentReviews = () => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/latest-review`
      );

      return data;
    },
  });

  //  loading
  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <FeaturedPanelSkeleton />
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <StandardCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-10 bg-red-50 rounded-lg">
        Error fetching reviews: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
          <h1 className="text-3xl font-bold  text-center ">
            Latest <span className="text-indigo-400">Reviews</span>
          </h1>
          <p className="max-w-20 mx-auto border-2 border-indigo-400 rounded-full my-2"></p>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl text-center mx-auto">
            Unfiltered Opinions from the Front Lines - Fresh Takes on Today’s
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch mt-10">
          <FeaturedInfoPanel
            stats={reviews?.stats}
            latestReview={reviews?.latestReviews[0]}
          />

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
            {reviews.latestReviews?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentReviews;
