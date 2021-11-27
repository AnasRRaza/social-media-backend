const Post = require("../Models/post");


const creatPost = (req, res) => {
  const { title, content, author } = req.body;
  Post.create({
    title,
    content,
    author,
  }).then((data) => {
    res.status(201).send({
      message: "Post created successfully",
      post: data,
    })
  }).catch((err) => {
    res.status(400).send({
      message: "Failed",
      err,
    })
  })
}

const getPost = (req, res) => {
  const id = req.params.id;
  Post.findOne({
    _id: id,
  }).then((data) => {
    res.status(200).send({
      post: data,
    })
  }).catch((err) => {
    res.status(404).send({
      message: "User not found",
      err,
    })
  })

}


module.exports = {
  creatPost,
  getPost
}