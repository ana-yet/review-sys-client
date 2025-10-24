import React from "react";
import FeaturedCard from "../../components/FeaturedCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Featured = () => {
  // Use React Query for better data fetching and caching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featuredServices"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/featured`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
            >
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto py-16 text-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg inline-block">
          Error loading featured services: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Customer <span className="text-indigo-600">Favorites</span>
        </h2>
        <div className="w-20 h-1 bg-indigo-600 rounded-full mx-auto mt-4"></div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Top-rated picks loved by our community
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((service) => (
          <FeaturedCard key={service._id} dat={service} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
