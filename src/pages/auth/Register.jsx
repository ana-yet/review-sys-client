import React, { useState } from "react";
import { Link, Navigate } from "react-router";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import animationData from "../../assets/register.json";
import { toast } from "react-toastify";
import useAuth from "../../hook/useAuth";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createEmailUser, googleLogin, user, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      updatePasswordStrength(value);
    }
  };

  const updatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;

    const strengthText = [
      "Very Weak",
      "Weak",
      "Medium",
      "Strong",
      "Very Strong",
    ][strength];
    setPasswordStrength(strengthText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      return toast.error(
        "Password must be 8 characters one uppercase and one lowercase!"
      );
    }

    console.log(formData);

    createEmailUser(formData.email, formData.password)
      .then(() => {
        axios
          .post("http://localhost:3000/user", {
            email: formData.email,
            name: formData.name,
            photo: formData.photo,
          })
          .then((response) => {
            if (response.status) {
              Swal.fire({
                title: "Registration Successful!",
                text: "Your account has been created successfully",
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#4f46e5",
                timer: 1500,
                customClass: {
                  popup: "rounded-2xl",
                  title: "text-2xl font-bold",
                  confirmButton: "px-6 py-2 rounded-lg",
                },
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              }).then(() => {
                setFormData({
                  name: "",
                  email: "",
                  photo: "",
                  password: "",
                  terms: false,
                });
                setPasswordStrength("");
              });
            }
          })
          .catch((error) => {
            console.error("Error posting data:", error);
          });
      })
      .catch(() => {
        toast.error("Register Unsuccessful!");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        // console.log(res?.user?.email, res?.user?.email, res?.user.photoURL);

        axios
          .post("http://localhost:3000/user", {
            email: res?.user?.email,
            name: res?.user?.email,
            photo: res?.user.photoURL,
          })
          .then((response) => {
            if (response.status) {
              Swal.fire({
                title: "Registration Successful!",
                text: "Your account has been created successfully",
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#4f46e5",
                timer: 1500,
                customClass: {
                  popup: "rounded-2xl",
                  title: "text-2xl font-bold",
                  confirmButton: "px-6 py-2 rounded-lg",
                },
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
            }
          })
          .catch((error) => {
            console.error("Error posting data:", error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <h1> loading...</h1>;
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "Very Weak":
        return "text-red-500";
      case "Weak":
        return "text-orange-500";
      case "Medium":
        return "text-yellow-500";
      case "Strong":
        return "text-green-500";
      case "Very Strong":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Helmet>
        <title>Register | Review System</title>
        <meta
          name="description"
          content="Welcome to the Register of Review System"
        />
      </Helmet>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-white"></div>
          </div>

          <div className="text-center text-white z-10 mb-6">
            <h1 className="text-3xl font-bold mb-2">Service Review</h1>
            <p className="opacity-90">
              Your Experience Matters—Start Reviewing Today
            </p>
          </div>

          <div className="w-full max-w-xs z-10">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </div>

          <div className="mt-6 text-white text-sm opacity-80 z-10">
            <p>Trusted by over 50,000 user</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 mb-8">
            Join Our Trusted Reviewer Community Today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="John Doe"
                  required
                />
                <FaUser className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="john@example.com"
                  required
                />
                <FaEnvelope className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="photo" className="block text-gray-700 mb-2">
                Photo URL
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  id="photo"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="https://example.com/photo.jpg"
                />
                <FaImage className="absolute right-4 top-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-indigo-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 flex justify-between">
                <span>Must be at least 8 characters</span>
                <span className={`font-medium ${getPasswordStrengthColor()}`}>
                  {passwordStrength}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400">or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            >
              <FaGoogle className="text-red-500 mr-2" />
              Google
            </button>
            <button
              onClick={() => toast.warning("After Assignment!!")}
              type="button"
              className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
            >
              <FaGithub className="text-gray-800 mr-2" />
              GitHub
            </button>
          </div>

          <div className="text-center text-gray-600">
            <p>
              Already have an account?
              <Link
                to="/login"
                className="text-indigo-600 font-medium hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
