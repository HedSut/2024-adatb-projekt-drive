const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secret, userAuth } = require("../config/auth");
const UserDao = require("../dao/user-dao");

router.get("/profile", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (!username) {
        res.cookie("msg", "Nem vagy bejelentkezve!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/");
    }

    return res.render("profile", {
        username: username,
        msg: msg
    });
});

router.post("/changepassword", async (req, res) => {
    const token = req.cookies.jwt;
    let { passwordold } = req.body;
    let { passwordnew } = req.body;
    let { passwordnewagain } = req.body;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (passwordnew != passwordnewagain) {
        res.cookie("msg", "Nem egyezik a két új jelszó!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/profile");
    }

    const user = await new UserDao().getUser(username);

    bcrypt.compare(passwordold, user[2]).then(async function (result) {
        if (result) {
            const newhash = await bcrypt.hash(passwordnew, 10);
            await new UserDao().updatePassword(username, newhash);
            res.cookie("msg", "Jelszó frissítve!\nJelentkezz be!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/logout");
        } else {
            res.cookie("msg", "Hibás jelszó!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/profile");
        }
    });
});


router.post("/changeemail", async (req, res) => {
    const token = req.cookies.jwt;
    let { email } = req.body;
    let { password } = req.body;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    const user = await new UserDao().getUser(username);

    bcrypt.compare(password, user[2]).then(async function (result) {
        if (result) {
            await new UserDao().updateEmail(username, email);
            res.cookie("msg", "Email sikeresen frissítve!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/profile");
        } else {
            res.cookie("msg", "Hibás jelszó!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/profile");
        }
    });
});


router.post("/uploadpp", async (req, res) => {
    const token = req.cookies.jwt;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        res.cookie("msg", "Sikertelen profilkép feltöltés", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/profile");
    }

    let uploadedFile = req.files.profilepic;
    const filename = uploadedFile.name;

    let extension = filename.split(".");
    extension = extension[extension.length - 1];

    const validExtensions = ["png", "jpeg", "jpg"];
    if (!validExtensions.includes(extension)) {
        res.cookie("msg", "Nem megfelelő fájlformátum!\n.png/.jpg/.jpeg", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/profile");
    }

    await uploadedFile.mv("./public/profpics/" + username + ".png");

    res.cookie("msg", "Profilkép sikeresen frissítve!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/profile");
});

module.exports = router;