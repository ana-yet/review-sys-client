import { useState } from "react";

const useServiceComparison = () => {
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const compareServices = async (serviceIds) => {
    if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
      setError("No service IDs provided for comparison");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API}/services/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceIds }),
      });

      if (!response.ok) {
        throw new Error("Failed to compare services");
      }

      const data = await response.json();
      setComparisonData(data.services);
      return data.services;
    } catch (err) {
      setError(err.message);
      console.error("Error comparing services:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    comparisonData,
    loading,
    error,
    compareServices,
  };
};

export default useServiceComparison;