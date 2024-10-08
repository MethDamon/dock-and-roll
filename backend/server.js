// server.js
const express = require('express');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Middleware to parse JSON requests (if you need it)
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
