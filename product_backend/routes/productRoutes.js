const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET ALL PRODUCTS


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch products error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});


// GET PRODUCT BY ID


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product: product,
    });
  } catch (error) {
    console.error("Fetch product error:", error);

    res.status(400).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});


// ADD PRODUCT


router.post("/add", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const {
      title,
      price,
      image,
      rating,
    } = req.body;

    const product = new Product({
      title,
      price,
      image,
      rating,
    });

    const savedProduct = await product.save();

    console.log("Product saved:", savedProduct);

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);

    res.status(400).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});


// UPDATE PRODUCT


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(400).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
});


// DELETE PRODUCT


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct =
      await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(400).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

module.exports = router;