import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";

// Lazy load components for better performance
const Banner = React.lazy(() => import("./Banner"));
const HowItWorks = React.lazy(() => import("./HowItWork"));
const Featured = React.lazy(() => import("./Featured"));
const Partners = React.lazy(() => import("./Partners"));
const RecentReviews = React.lazy(() => import("./RecentReview/RecentReview"));
const WhyUs = React.lazy(() => import("./WhyUs"));
const PlatformStats = React.lazy(() => import("./PlatformStats"));

// Loading skeletons for better UX
const SectionSkeleton = () => (
  <div className="py-16 animate-pulse">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-64"></div>
        ))}
      </div>
    </div>
  </div>
);

const ModernHome = () => {
  // Fetch stats data with React Query for better caching and performance
  const { data: statsData } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/counts`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>Home | Service Reviews</title>
        <meta
          name="description"
          content="Discover and review quality services with our trusted platform"
        />
      </Helmet>

      {/* Hero Banner */}
      <Suspense
        fallback={
          <div className="h-[60vh] bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse"></div>
        }
      >
        <Banner />
      </Suspense>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorks />
        </Suspense>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <Suspense fallback={<SectionSkeleton />}>
          <Featured />
        </Suspense>
      </section>

      {/* Platform Stats */}
      <section className="py-16 bg-white">
        <Suspense fallback={<SectionSkeleton />}>
          <PlatformStats statsData={statsData || {}} />
        </Suspense>
      </section>

      {/* Recent Reviews */}
      <section className="py-16 bg-gray-50">
        <Suspense fallback={<SectionSkeleton />}>
          <RecentReviews />
        </Suspense>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-white">
        <Suspense fallback={<SectionSkeleton />}>
          <WhyUs />
        </Suspense>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <Suspense fallback={<SectionSkeleton />}>
          <Partners />
        </Suspense>
      </section>
    </div>
  );
};

export default ModernHome;
