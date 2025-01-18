import Product from "../models/product.js";

export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const data = await Product.findOne({ slug });
  res.json({ data });
};

export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  const data = await Product.find({ category });
  res.json({ data });
};
