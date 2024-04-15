const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao");

router.get("/register", async (req, res) => {
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

    return res.render("registration", {
        msg: msg,
        username: username,
    });
});

router.post("/registeruser", async (req, res) => {
    let { username } = req.body;
    let { password } = req.body;
    let { email } = req.body;
    let { passwordAgain } = req.body;

    if (!username || !email || !password || !passwordAgain) {
        res.cookie("msg", "Tölts ki minden mezőt!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/register");
    }

    if (password != passwordAgain) {
        res.cookie("msg", "A két jelszó nem egyezik!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/register");
    }

    let user = await new UserDao().getUser(username);
    if (user) {
        res.cookie("msg", "Már létezik fiók ilyen felhasználónévvel!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/register");
    }

    user = await new UserDao().getUserByEmail(email);
    if (user) {
        res.cookie("msg", "Már létezik fiók ilyen email cimmel!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/register");
    }

    const hash = await bcrypt.hash(password, 10);
    await new UserDao().addUser(username, email, hash);
    await new FolderDao().addRootFolder(username);
    res.cookie("msg", "Fiók sikeresen létrehozva!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/login");
});

module.exports = router;
