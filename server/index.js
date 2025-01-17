import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";;
import mongoose from "mongoose";
import Product from "./models/product.js";
import { formSchema } from "./utils/checkoutFormSchemaValidation.js";
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
  
})

app.post("/submit", async (req, res) => {
  console.log("Inside Submit");
  const data = await formSchema.validate(req.body, { abortEarly: false });
  console.log(data);
  if (data.error) {
    return res.status(400).json({ error: data.error });
  }
  // Handle valid data
  res.status(200).json({ message: "Form submitted successfully" });
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
