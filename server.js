const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const POSTS_FILE = "./posts.json";
const REVIEWS_FILE = "./reviews.json";

/* ---------- HELPERS ---------- */

async function readJSON(file) {
  try {
    return await fs.readJson(file);
  } catch {
    return [];
  }
}

async function writeJSON(file, data) {
  await fs.writeJson(file, data, { spaces: 2 });
}

/* ---------- POSTS API ---------- */

app.get("/posts", async (req, res) => {
  const posts = await readJSON(POSTS_FILE);
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const posts = await readJSON(POSTS_FILE);

  const newPost = {
    id: uuidv4(),
    title: req.body.title,
    content: req.body.content,
    author: req.body.author || "Andromeda Publisher",
    date: new Date()
  };

  posts.unshift(newPost);
  await writeJSON(POSTS_FILE, posts);

  res.json(newPost);
});

/* ---------- REVIEWS API ---------- */

app.get("/reviews", async (req, res) => {
  const reviews = await readJSON(REVIEWS_FILE);
  res.json(reviews);
});

app.post("/reviews", async (req, res) => {
  const reviews = await readJSON(REVIEWS_FILE);

  const newReview = {
    id: uuidv4(),
    postId: req.body.postId,
    name: req.body.name,
    message: req.body.message,
    date: new Date()
  };

  reviews.push(newReview);
  await writeJSON(REVIEWS_FILE, reviews);

  res.json(newReview);
});

/* ---------- ROOT CHECK ---------- */

app.get("/", (req, res) => {
  res.send("Andromeda Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
