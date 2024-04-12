const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {secret, userAuth} = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");

router.get("/", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
            res.cookie("msg", "Már be vagy jelentkezve!", {httpOnly: true, maxAge: 1000});
            return res.redirect("/");
        })
    }


    return res.render("index", {
        msg: msg,
        username: username
    })
});


router.get("/login", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
            res.cookie("msg", "Már be vagy jelentkezve!", {httpOnly: true, maxAge: 1000});
            return res.redirect("/");
        })
    }

    return res.render("login", {
        msg: msg,
        username: username,
    });
});


router.get("/logout", async (req, res) => {
    res.cookie("jwt", "", {maxAge: 1});
    res.cookie("msg", "Sikeres kijelentkezés!", {httpOnly: true ,maxAge: 1000});
    res.redirect("/");
});


router.get("/register", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
            res.cookie("msg", "Már be vagy jelentkezve!", {httpOnly: true, maxAge: 1000});
            return res.redirect("/");
        })
    }

    return res.render("registration", {
        msg: msg,
        username: username
    }); 
});


module.exports = router;