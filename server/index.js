import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json({ limit: "50mb" }));

app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);

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
