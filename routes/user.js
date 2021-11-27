const express = require("express");
const router = express.Router();
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const userController = require("../Controllers/user")

const users = [];

router.post("/register", userController.createUser);
router.get("/getUser/:id", userController.getUser);
router.get("/getAll", userController.getAll);
router.put("/update", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

// router.post("/register", (req, res) => {

//   const id = new Date().getTime();
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = md5(req.body.password);

//   const isMatch = users.some((user) => {
//     return user.username === username || user.email === email;
//   });

//   if (isMatch) {
//     res.status(409);
//     res.send({ message: "Username or email already exist!" });
//   } else {
//     users.push({
//       userId: id,
//       username,
//       email,
//       password
//     });
//     res.status(200);
//     res.send({
//       message: "User created successfully",
//       userId: id,
//     });
//   }
// });

router.post("/login", (req, res) => {

  const username = req.body.username;
  const password = md5(req.body.password);

  const currentUser = users.find((user) => {
    return user.username === username && user.password === password;
  });

  const copyUserInfo = { ...currentUser }
  delete copyUserInfo.password;

  if (currentUser) {
    jwt.sign(
      { user: copyUserInfo },
      "secretkey",
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          res.status(401);
          res.send("Login failed!");
        } else {
          res.status(200);
          res.send({
            loggedIn: true,
            user: copyUserInfo,
            token,
          });
        }
      }
    );
  } else {
    res.status(401);
    res.send({
      loggedIn: false,
      message: "Invalid username or password!"
    })
  }
});

router.get("/all", (req, res) => {
  res.send(users);
});

module.exports = router;