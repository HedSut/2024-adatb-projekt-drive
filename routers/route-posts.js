const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao")

router.post("/loginuser", async (req, res) => {
    let { username } = req.body;
    let { password } = req.body;

    const user = await new UserDao().getUser(username);

    if (!user) {
        res.cookie("msg", "Nincs ilyen felhasználó!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/login");
    } else {
        bcrypt.compare(password, user[2]).then(function (result) {
            if (result) {
                const token = jwt.sign({ username: username }, secret);
                res.cookie("jwt", token, { httpOnly: true });
                res.cookie("msg", "Sikeres bejelentkezés!", { httpOnly: true, maxAge: 1000 });
                return res.redirect("/");
            }
            else {
                res.cookie("msg", "Hibás jelszó!", { httpOnly: true, maxAge: 1000 });
                return res.redirect("/login");
            }
        });
    }
});


router.post("/registeruser", async (req, res) => {
    let { username } = req.body;
    let { password } = req.body;
    let { email } = req.body;
    let { passwordAgain } = req.body;

    if (!username || !email || !password || !passwordAgain) {
        res.cookie("msg", "Tölts ki minden mezőt!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    if (password != passwordAgain) {
        res.cookie("msg", "A két jelszó nem egyezik!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    let user = await new UserDao().getUser(username);
    if (user) {
        res.cookie("msg", "Már létezik fiók ilyen felhasználónévvel!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    user = await new UserDao().getUserByEmail(email);
    if (user) {
        res.cookie("msg", "Már létezik fiók ilyen email cimmel!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    const hash = await bcrypt.hash(password, 10);
    await new UserDao().addUser(username, email, hash);
    await new FolderDao().addRootFolder(username);
    res.cookie("msg", "Fiók sikeresen létrehozva!", { httpOnly: true, maxAge: 1000 });
    return res.redirect("/login");
});


router.post("/addfolder", async (req, res) => {
    const token = req.cookies.jwt;
    let { folderid } = req.body;
    let username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (username) {
        await new FolderDao().addFolder("Új mappa", folderid, username)
    }
    res.cookie("msg", "Mappa sikeresen létrehozva!", { httpOnly: true, maxAge: 1000 });
    return res.redirect("explorer/" + folderid);
});

module.exports = router;