import { useEffect, useState } from "react";
import axios from "axios";

const ProductCard = ({ source }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let response;

        if (source === "fake") {
          console.log("Fetching Fake Store products...");

          response = await axios.get(
            "https://fakestoreapi.com/products"
          );
        } else {
          console.log("Fetching MongoDB products...");

          response = await axios.get(
            "http://localhost:3000/products"
          );
        }

        console.log("Response:", response.data);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [source]);

  return (
    <div className="min-h-screen bg-base-200 p-6">

      {/* Heading */}
      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold">
          {source === "fake"
            ? "Fake Store Products"
            : "MongoDB Products"}
        </h1>

        <p className="text-gray-500 mt-2">
          {source === "fake"
            ? "Products fetched from Fake Store API"
            : "Products fetched from MongoDB"}
        </p>

      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Products */}
      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {data.map((product, index) => (
            <div
              key={product._id || product.id || index}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >


              <figure className="h-60 bg-white p-4">
                <img
                  src={product.image}
                  alt={
                    product.title ||
                    product.productName ||
                    "Product"
                  }
                  className="h-full w-full object-contain"
                />
              </figure>


              <div className="card-body items-center text-center">


                <h2 className="card-title text-base h-14 overflow-hidden">
                  {product.title || product.productName}
                </h2>


                <p className="text-2xl font-bold text-blue-400">
                  ${product.price}
                </p>


                <span className="text-sm text-gray-500 font-bold">
                  ⭐{" "}
                  {product.rating?.rate ||
                    product.rating ||
                    "No rating"}
                </span>

              </div>
            </div>
          ))}

        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">
            No products found.
          </p>
        </div>
      )}

    </div>
  );
};

export default ProductCard;