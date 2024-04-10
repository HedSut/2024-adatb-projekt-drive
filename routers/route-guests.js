const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//const {secret, userAuth} = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");

router.get("/", async (req, res) => {
    const users = await new UserDao().getAllUsers();
    console.log(users);

    return res.render("index", {

    })
});

router.get("/login", async (req, res) => {


    return res.render("login", {

    });
});

router.post("/loginuser", async (req, res) => {
    

    return res.redirect("/");
})

module.exports = router;