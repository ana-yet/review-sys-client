import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
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

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
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
        element: <AllServices />,
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
