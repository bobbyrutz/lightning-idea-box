const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all ideas
app.get("/ideas", (req, res) => {
  const data = fs.readFileSync("ideas.json");
  res.json(JSON.parse(data));
});

// Add a new idea
app.post("/ideas", (req, res) => {
  const idea = req.body.idea;
  const data = JSON.parse(fs.readFileSync("ideas.json"));
  data.unshift(idea);
  fs.writeFileSync("ideas.json", JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
