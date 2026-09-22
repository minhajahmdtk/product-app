import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/auth/login",
        form
      );

      if (response.data.token) {
        localStorage.setItem(
          "loginToken",
          response.data.token
        );

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );
      }

      alert("Login Successful");

      navigate("/products");

    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
          "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo / Heading */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-400">
            Product App
          </h1>

          <p className="text-gray-500 mt-2">
            Login to manage your products
          </p>

        </div>

        {/* Login Card */}

        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 shadow-xl p-8"
        >

          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          {/* Email */}

          <div className="form-control mb-5">

            <label className="label">
              <span className="label-text font-semibold">
                Email
              </span>
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="input input-bordered w-full focus:outline-none focus:border-blue-400"
            />

          </div>

          {/* Password */}

          <div className="form-control mb-6">

            <label className="label">
              <span className="label-text font-semibold">
                Password
              </span>
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="input input-bordered w-full focus:outline-none focus:border-blue-400"
            />

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>

          {/* Register Link */}

          <p className="text-center text-gray-500 mt-6">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:text-blue-500"
            >
              Register here
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;