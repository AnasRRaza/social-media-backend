const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

const mongoConStr = "mongodb+srv://anas:anas123@cluster.h17ig.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

const user = require("./routes/user");
app.use("/user", user);

const posts = require("./routes/posts")
app.use("/posts", posts);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  mongoose.connect(mongoConStr).then(() => {
    console.log("Database Connected");
  }).catch((e) => {
    console.log(e);
  })
  console.log(`Example app listening at http://localhost:${port}`);
})