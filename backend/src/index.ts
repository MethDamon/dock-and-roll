// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const port = process.env.PORT || 3333;

// Middleware to parse JSON requests
app.use(express.json());

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
