import ServiceDetailsCard from "../components/ServiceDetailsCard";
import AddReview from "../components/AddReview";
import Review from "../components/Review";
import LoadingSpinner from "../pages/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";

const ServiceDetails = () => {
  const params = useParams();

  const {
    data: service = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Service"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/services/${params.id}`
      );

      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-center text-red-500 font-medium">
          Error to get data : {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <Helmet>
        <title>Details | Review System</title>
        <meta
          name="Service Review details"
          content="Welcome to the Details of Review System"
        />
      </Helmet>

      <h1 className="text-3xl font-heading font-bold text-center py-7">
        Details About
        <span className="text-indigo-500"> {service.companyName}</span>
      </h1>

      <ServiceDetailsCard service={service} />

      <Review service={service} />

      <AddReview service={service} />
    </div>
  );
};

export default ServiceDetails;
