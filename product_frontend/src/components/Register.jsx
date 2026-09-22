import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
        "/api/auth/register",
        form
      );

      console.log(response.data);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-400">
            Product App
          </h1>

          <p className="text-gray-500 mt-2">
            Create an account to get started
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 shadow-xl p-8"
        >

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>

          <div className="form-control mb-5">

            <label className="label">
              <span className="label-text font-semibold">
                Name
              </span>
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="input input-bordered w-full focus:outline-none focus:border-blue-400"
            />

          </div>

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
              placeholder="Create a password"
              required
              className="input input-bordered w-full focus:outline-none focus:border-blue-400"
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Register
          </button>

          <p className="text-center text-gray-500 mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:text-blue-500"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Register;