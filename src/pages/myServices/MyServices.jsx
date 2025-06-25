import React, { useEffect, useState } from "react";
import ServicesTable from "../../components/ServicesTable";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/AxiosSecure";
import { Helmet } from "react-helmet-async";

const MyServices = () => {
  const { user, loading, setLoading } = useAuth();
  const [services, setServices] = useState([]);
  const axiosSecure = useAxiosSecure();

  // console.log(user.email);

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure(`/my-service/${user.email}`)
        .then((res) => {
          setServices(res.data);
        })
        .catch((err) => {
          console.error("Error fetching services:", err);
        });
    }
  }, [loading, user?.email, setLoading, user, axiosSecure]);

  if (loading || !user) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>My Services | Review System</title>
        <meta
          name="description"
          content="Welcome to the My Services of Review System"
        />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Services</h1>
        <ServicesTable services={services} setServices={setServices} />
      </div>
    </div>
  );
};

export default MyServices;
