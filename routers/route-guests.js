const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//const {secret, userAuth} = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");

router.get("/", async (req, res) => {
    await new UserDao().getAllUsers();

    return res.render("guest", {
    })
});

module.exports = router;