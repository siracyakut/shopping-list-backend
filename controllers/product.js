const Product = require("../models/product");
const { validationResult } = require("express-validator");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length > 0) {
      res.status(200).json({ success: true, data: products });
    } else {
      res.status(404).json({ success: false, data: "Products not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, data: "Product not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { name, price, image, description } = req.body;

    const newProduct = new Product({
      name,
      image,
      longDescription: description,
      salePrice: price,
    });

    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { id, name, price, image, description } = req.body;

    let updateObject = {};
    if (name) updateObject.name = name;
    if (price) updateObject.salePrice = price;
    if (image) updateObject.image = image;
    if (description) updateObject.longDescription = description;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateObject, {
      new: true,
    });

    if (updatedProduct) {
      res.status(200).json({ success: true, data: updatedProduct });
    } else {
      res.status(404).json({ success: false, data: "Product not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

const deleteProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, data: errors.array()[0].msg });
  }

  try {
    const { id } = req.body;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      res.status(200).json({ success: true, data: deletedProduct });
    } else {
      res.status(404).json({ success: false, data: "Product not found!" });
    }
  } catch (e) {
    res.status(500).json({ success: false, data: e.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
