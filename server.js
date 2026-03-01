const express = require("express");
const cors = require("cors");
const fs = require("fs"); // ⭐ THIS WAS MISSING

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// storage files
const reviewsFile = "./reviews.json";
const publishersFile = "./publishers.json";

// create files if missing
if (!fs.existsSync(reviewsFile)) fs.writeFileSync(reviewsFile, "[]");
if (!fs.existsSync(publishersFile)) fs.writeFileSync(publishersFile, "[]");

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Andromeda Backend is running 🚀");
});


// ===== REVIEWS =====
app.get("/api/reviews", (req, res) => {
  const data = JSON.parse(fs.readFileSync(reviewsFile));
  res.json(data);
});

app.post("/api/reviews", (req, res) => {
  const data = JSON.parse(fs.readFileSync(reviewsFile));
  data.push(req.body);
  fs.writeFileSync(reviewsFile, JSON.stringify(data, null, 2));
  res.json({ success: true });
});


// ===== PUBLISHERS =====
app.get("/api/publishers", (req, res) => {
  const data = JSON.parse(fs.readFileSync(publishersFile));
  res.json(data);
});

app.post("/api/publishers", (req, res) => {
  const data = JSON.parse(fs.readFileSync(publishersFile));
  data.push(req.body);
  fs.writeFileSync(publishersFile, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
