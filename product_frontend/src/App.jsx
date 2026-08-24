import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./index.css";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import AddProduct from "./components/AddProduct";

import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [source, setSource] = useState("fake");

  const location = useLocation();

  // Check whether user is logged in
  const isLoggedIn = localStorage.getItem("loginToken");

  // Show Navbar only when logged in
  const showNavbar =
    isLoggedIn &&
    location.pathname !== "/login" &&
    location.pathname !== "/register";

  return (
    <div>

      {/* Navbar only after login */}
      {showNavbar && (
        <Navbar setSource={setSource} />
      )}

      <Routes>

        {/* Starting page */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<ProductCard source={source} />}
        />

        {/* Add Product */}
        <Route
          path="/add-product"
          element={<AddProduct />}
        />

      </Routes>

    </div>
  );
};

export default App;