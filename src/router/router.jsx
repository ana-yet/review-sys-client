import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AddService from "../services/AddService";
import AllServices from "../services/AllServices";
import ServiceDetails from "../services/ServiceDetails";
import MyServices from "../pages/myServices/MyServices";
import MyReviews from "../pages/MyReviews/MyReviews";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "../context/PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/About Us/AboutUs";
import ModernHome from "../pages/Home/ModernHome";

// Create a new component for Service Comparison page
const ServiceComparisonPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Service Comparison</h1>
      <p className="text-gray-600 mb-8">Compare different services side by side to make the best decision.</p>
      <AllServices />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: ModernHome,
      },
      {
        path: "add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "all-services",
        Component: AllServices,
      },
      {
        path: "services/compare",
        Component: ServiceComparisonPage,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "my-services",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "services/:id",
        Component: ServiceDetails,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);

export default router;