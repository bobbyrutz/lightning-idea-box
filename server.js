const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

// Middleware
app.use(cors());
app.use(express.json());

// API: Get all ideas
app.get("/ideas", (req, res) => {
  const data = fs.readFileSync("ideas.json");
  res.json(JSON.parse(data));
});

// API: Add an idea
app.post("/ideas", (req, res) => {
  const idea = req.body.idea;
  const data = JSON.parse(fs.readFileSync("ideas.json"));
  data.unshift(idea);
  fs.writeFileSync("ideas.json", JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// Fallback for client-side routing (optional)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
