const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

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
  console.log(`Example app listening at http://localhost:${port}`);
})