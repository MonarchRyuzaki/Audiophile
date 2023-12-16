import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Read the JSON file
const jsonString = fs.readFileSync("./data.json", "utf-8");

// Parse the JSON string into a JavaScript array
const jsonArray = JSON.parse(jsonString);

app.get("/:category", (req, res) => {
  const { category } = req.params;
  const data = jsonArray.filter((item) => item.category === category);
  res.json({ data });
});

app.get("/product/:slug", (req, res) => {
  const { slug } = req.params;
  const data = jsonArray.find((item) => item.slug === slug);
  res.json({ data });
});

app.post("/cart", (req, res) => {
  const { slug, count } = req.body;
  const { name } = jsonArray.find((item) => item.slug === slug);
  res.send({ status: 200, name });
});

app.get("/", async (req, res) => {
  res.send("Working");
});

app.listen(8080, () => {
  console.log("Server has started");
});
