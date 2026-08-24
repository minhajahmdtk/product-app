import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const productData = {
        title: form.title,
        image: form.image,
        price: Number(form.price),
        rating: Number(form.rating),
      };

      console.log("Sending:", productData);

      const response = await axios.post(
        "http://localhost:3000/products/add",
        productData
      );

      console.log(
        "Product added:",
        response.data
      );

      alert("Product added successfully!");
      setForm({
        title: "",
        image: "",
        price: "",
        rating: "",
      });
    } catch (error) {
      console.error(
        "Error adding product:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center bg-base-200 p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Add Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Product Title
                </span>
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="input input-bordered w-full"
                required
              />

            </div>
            <div className="form-control mt-4">

              <label className="label">
                <span className="label-text font-bold">
                  Image URL
                </span>
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                required
              />

            </div>
            <div className="form-control mt-4">

              <label className="label">
                <span className="label-text font-bold">
                  Price
                </span>
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className="input input-bordered w-full"
                required
              />

            </div>

            <div className="form-control mt-4">

              <label className="label">
                <span className="label-text font-bold">
                  Rating
                </span>
              </label>

              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="Enter rating"
                min="1"
                max="5"
                step="0.1"
                className="input input-bordered w-full"
                required
              />

            </div>


            <div className="card-actions justify-center mt-6">

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading
                  ? "Adding..."
                  : "Add Product"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;