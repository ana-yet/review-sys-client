import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import { FaSearch, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";
import { Helmet } from "react-helmet-async";
import ServiceTable from "../components/ServiceTable";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [list, setList] = useState(false);
  const [style, setStyle] = useState("card");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const queryParams = new URLSearchParams();
        if (selectedCategory && selectedCategory !== "all") {
          queryParams.append("category", selectedCategory);
        }
        if (searchTerm.trim()) {
          queryParams.append("search", searchTerm.trim());
        }

        const res = await fetch(
          `${
            import.meta.env.VITE_SERVER_API
          }/services?${queryParams.toString()}`
        );

        if (!res.ok) throw new Error("Failed to fetch services");

        const data = await res.json();

        setServices(data.services);
        setFilteredServices(data.services);
        setCategories(["all", ...data.categories]);
      } catch (err) {
        setError("Failed to load services.");
        toast.error("Failed to load services!", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    let filtered = [...services];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (s) => s.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title?.toLowerCase().includes(term) ||
          s.description?.toLowerCase().includes(term) ||
          s.companyName?.toLowerCase().includes(term) ||
          s.category?.toLowerCase().includes(term)
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, services]);

  const handleChange = (event) => {
    setStyle(event.target.value);
  };

  console.log(style);

  return (
    <div className="min-h-screen pb-10  mt-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>All Service | Review System</title>
        <meta
          name="All Service Page"
          content="Welcome to the all Service of Review system"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 ">
            Explore Services
          </h1>
          <p className="mt-2 text-gray-600">
            Discover professional services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={style}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
          >
            <option value="card">Card</option>
            <option value="table">Table</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={nanoid()} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20 h-screen">
            <FaSpinner className="animate-spin h-10 w-10 text-blue-600" />
            <span className="ml-4 text-gray-600 text-lg">
              Loading services...
            </span>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-md mb-6 flex items-center">
            <FaExclamationTriangle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredServices.length > 0 ? (
              style === "card" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredServices.map((service) => (
                    <ServiceCard key={nanoid()} service={service} />
                  ))}
                </div>
              ) : (
                <ServiceTable services={filteredServices} />
              )
            ) : (
              <div className="text-center py-20 text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-xl font-semibold">
                  No services found
                </h3>
                <p className="mt-1">Try a different keyword or category.</p>
              </div>
            )}

            {filteredServices.length > 0 && (
              <div className="mt-8 text-center text-sm text-gray-600">
                Showing {filteredServices.length} of {services.length} services
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllServices;
