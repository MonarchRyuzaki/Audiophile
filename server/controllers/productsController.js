import Product from "../models/product.js";

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await Product.findOne({ slug });

    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await Product.find({ category });

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found in this category" });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
