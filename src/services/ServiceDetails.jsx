import React, { useEffect, useState } from "react";
import ServiceDetailsCard from "../components/ServiceDetailsCard";
import { useLoaderData } from "react-router";
import AddReview from "../components/AddReview";
import Review from "../components/Review";
import useAuth from "../hook/useAuth";
import LoadingSpinner from "../pages/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const ServiceDetails = () => {
  const serviceData = useLoaderData();
  const { loading } = useAuth();

  const [service, setService] = useState(serviceData);
  const [allReviews, setAllReviews] = useState([]);

  // console.log(allReviews);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_API}/reviews?id=${service._id}`)
      .then((res) => res.json())
      .then((data) => setAllReviews(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, [service._id]);

  if (loading) {
    return <LoadingSpinner text="loading service..." />;
  }

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>Details | Review System</title>
        <meta
          name="description"
          content="Welcome to the Details of Review System"
        />
      </Helmet>
      <h1 className="text-base md:text-3xl font-heading font-bold text-center py-7">
        Details About
        <span className="text-green-500"> {service.companyName}</span>
      </h1>

      <ServiceDetailsCard service={service} />

      <Review allReviews={allReviews} />

      <AddReview
        service={service}
        setService={setService}
        allReviews={allReviews}
        setAllReviews={setAllReviews}
      />
    </div>
  );
};

export default ServiceDetails;
