const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const upload = require("../multer")

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader && bearerHeader.includes("Bearer ")) {
    const token = bearerHeader.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.status(403);
    res.send({ message: "Authorization token is missing or invalid!" });
  }
};


const posts = []

router.post("/", [verifyToken, upload.single("image")], (req, res) => {
  jwt.verify(req.token, "secretkey", (e, data) => {
    if (e) {
      res.status(403);
      res.send({ message: "Invalid token" })
    } else {
      const newPost = {
        id: new Date().getTime(),
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
        author: data.user.username,
      }
      posts.push(newPost);
      res.send({
        message: "Post created successfully",
        post: newPost
      })
    }
  })
})

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (e, data) => {
    if (e) {
      res.status(403);
      res.send({ message: "Invalid token" });
    } else {
      const allPosts = posts.map((post) => {
        return post;
      })
      res.send({ posts: allPosts });
    }
  })
})



module.exports = router;