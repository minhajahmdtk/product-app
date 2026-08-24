import { FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSource }) => {
  const navigate = useNavigate();

  const handleFakeStore = () => {
    setSource("fake");
    navigate("/products");
  };

  const handleMongoDB = () => {
    setSource("mongodb");
    navigate("/products");
  };

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("isLoggedIn");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">

      {/* Logo */}

      <div className="navbar-start">
        <Link
          to="/products"
          className="flex items-center gap-2 text-xl font-bold text-blue-400"
        >
          <FaShoppingBag className="text-2xl" />
          Product App
        </Link>
      </div>


      {/* Navigation */}

      <div className="navbar-end gap-2">

        {/* Fake Store */}

        <button
          type="button"
          onClick={handleFakeStore}
          className="btn btn-secondary"
        >
          Fake Store
        </button>


        {/* MongoDB */}

        <button
          type="button"
          onClick={handleMongoDB}
          className="btn btn-primary"
        >
          MongoDB
        </button>


        {/* Add Product */}

        <Link
          to="/add-product"
          className="btn btn-accent"
        >
          Add Product
        </Link>


        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-error"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;