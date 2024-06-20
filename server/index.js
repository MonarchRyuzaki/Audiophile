import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
// import fs from "fs";
import mongoose from "mongoose";
import Product from "./models/product.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
// // Read the JSON file
// const jsonString = fs.readFileSync("./data.json", "utf-8");

// // Parse the JSON string into a JavaScript array
// const jsonArray = JSON.parse(jsonString);

app.get("/:category", async (req, res) => {
  const { category } = req.params;
  const data = await Product.find({ category });
  res.json({ data });
});

app.get("/product/:slug", async (req, res) => {
  const { slug } = req.params;
  const data = await Product.findOne({ slug });
  res.json({ data });
});

app.post("/cart", async (req, res) => {
  const { slug, count } = req.body;
  const { name, image, category, price } = await Product.findOne({ slug });
  res.send({ status: 200, name, image, category, price });
});

app.get("/", async (req, res) => {
  res.send("Working");
});

app.listen(8080, () => {
  async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  }

  // Call the function to connect
  connectToDatabase();
  console.log("Server has started");
});
