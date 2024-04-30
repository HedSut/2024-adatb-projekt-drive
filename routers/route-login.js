const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");

router.get("/login", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
            res.cookie("msg", "Már be vagy jelentkezve!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/");
        });
    }

    return res.render("login", {
        msg: msg,
        username: username,
    });
});

router.get("/logout", async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("msg", "Sikeres kijelentkezés!", {
        httpOnly: true,
        maxAge: 1000,
    });
    res.redirect("/");
});

router.post("/loginuser", async (req, res) => {
    let { username } = req.body;
    let { password } = req.body;

    const user = await new UserDao().getUser(username);

    if (!user) {
        res.cookie("msg", "Nincs ilyen felhasználó!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/login");
    } else {
        bcrypt.compare(password, user[2]).then(function (result) {
            if (result) {
                admin = user[3] == "admin" ? true : false;
                const token = jwt.sign({ username: username, admin: admin}, secret);
                res.cookie("jwt", token, { httpOnly: true });
                res.cookie("msg", "Sikeres bejelentkezés!", {
                    httpOnly: true,
                    maxAge: 1000,
                });
                return res.redirect("/");
            } else {
                res.cookie("msg", "Hibás jelszó!", {
                    httpOnly: true,
                    maxAge: 1000,
                });
                return res.redirect("/login");
            }
        });
    }
});

module.exports = router;
