import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  const token = user?.accessToken;

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  return axiosSecure;
};

export default useAxiosSecure;
