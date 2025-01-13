import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
// import fs from "fs";
import Joi from "joi";
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

const formSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is a mandatory field.",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),

  phoneNumber: Joi.string()
    .pattern(/^\d{12,14}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required.",
      "string.pattern.base": "Phone number must contain 12 to 14 digits only.",
    }),

  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required.",
  }),

  zip: Joi.string().pattern(/^\d+$/).required().messages({
    "string.empty": "ZIP code is required.",
    "string.pattern.base": "ZIP code must be a valid number.",
  }),

  city: Joi.string().trim().required().messages({
    "string.empty": "City is required.",
  }),

  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required.",
  }),

  paymentMethod: Joi.string()
    .valid("eMoney", "cashOnDelivery")
    .required()
    .messages({
      "string.empty": "Payment method is required.",
      "any.only": 'Payment method must be either "eMoney" or "cashOnDelivery".',
    }),

  eMoneyNumber: Joi.string()
    .length(12)
    .when("paymentMethod", {
      is: "eMoney",
      then: Joi.required(),
      otherwise: Joi.string().allow("").optional(),
    })
    .messages({
      "string.empty": "eMoney number is required for eMoney payment.",
      "string.length": "eMoney number must be exactly 12 characters.",
    }),

  eMoneyPIN: Joi.string()
    .length(4)
    .when("paymentMethod", {
      is: "eMoney",
      then: Joi.required(),
      otherwise: Joi.string().allow("").optional(),
    })
    .messages({
      "string.empty": "eMoney PIN is required for eMoney payment.",
      "string.length": "eMoney PIN must be exactly 4 characters.",
    }),
});

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

app.post("/submit", async (req, res) => {
  console.log("Inside Submit");
  const { error } = await formSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error });
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
