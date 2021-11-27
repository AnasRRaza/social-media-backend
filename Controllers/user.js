const User = require("../Models/user");



const createUser = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    User.create({
        username,
        email,
        password
    }).then((data) => {
        console.log(data);
        res.status(200).send({
            message: "User Created Successfully",
            User: data,
        })

    }).catch((err) => {
        console.log(err);
        res.status(409).send({
            message: "Username or Email already exist",
            err,
        })
    })
}

const getUser = (req, res) => {
    const id = req.params.id;
    User.findOne({
        _id: id,
    }).then((data) => {
        // console.log(data);
        res.status(200).send({
            User: data,
        })
    }).catch((err) => {
        // console.log(err);
        res.status(404).send({
            message: "User not found",
            err,
        })
    })
}


const getAll = (req, res) => {
    User.find().then((data) => {
        res.status(200).send({
            Users: data
        }).catch((err) => {
            res.status(404).send({
                message: "Users not found",
                err,
            })
        })
    })
}

const updateUser = (req, res) => {
    const { id, user } = req.body;
    User.updateOne({
        _id: id,
    }, { ...user }).then((data) => {
        res.status(200).send({
            message: "User Updated successfully",
            User: data
        })
    }).catch((err) => {
        res.status(404).send({
            message: "User not found"
        })
    })
}

const deleteUser = (req, res) => {

}

module.exports = {
    createUser,
    getUser,
    getAll,
    updateUser,
    deleteUser,
}

