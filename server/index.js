import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Read the JSON file
const jsonString = fs.readFileSync("./data.json", "utf-8");

// Parse the JSON string into a JavaScript array
const jsonArray = JSON.parse(jsonString);

app.get("/", async (req, res) => {
  res.send("Working");
});

app.get("/:category", (req, res) => {
  const { category } = req.params;
  const data = jsonArray.filter((item) => item.category === category);
  res.json({ data });
});

app.listen(8080, () => {
  console.log("Server has started");
});
