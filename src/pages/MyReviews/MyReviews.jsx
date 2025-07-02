import React, { useEffect, useState } from "react";
import useAuth from "../../hook/useAuth";
import ReviewCard from "../../components/ReviewCard";
import { nanoid } from "nanoid";
import useAxiosSecure from "../../hook/AxiosSecure";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/my-review?email=${user.email}`)
        .then((res) => {
          setReviews(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;

  if (reviews.length === 0) {
    return (
      <div className="text-center h-[calc(100vh-30vh)] pt-32 text-gray-500 text-xl">
        You haven't submitted any reviews yet.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Helmet>
        <title>My Reviews | Review System</title>
        <meta
          name="description"
          content="Welcome to the My Reviews of Review System"
        />
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-8">My Reviews</h2>
      {reviews.map((review) => (
        <ReviewCard key={nanoid()} review={review} />
      ))}
    </div>
  );
};

export default MyReviews;
