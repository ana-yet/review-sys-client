import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_SERVER_API}/user?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) return <p className="text-center h-screen mt-10">Loading...</p>;

  return (
    <motion.div
      className="max-w-md mx-auto h-[calc(100vh-35vh)] mt-16 p-6 bg-white shadow-md rounded-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Profile | Review System</title>
        <meta
          name="description"
          content="Welcome to the Profile of Review System"
        />
      </Helmet>
      <img
        src={profile.photo}
        alt="User"
        className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
      />
      <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
        <FaUser className="text-blue-500" /> {profile.name}
      </h2>
      <p className="text-gray-600 flex items-center justify-center gap-2 mt-1">
        <FaEnvelope className="text-green-500" /> {profile.email}
      </p>
      <p className="text-sm text-gray-400 mt-2">User ID: {profile._id}</p>
    </motion.div>
  );
};

export default Profile;
