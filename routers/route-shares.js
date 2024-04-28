const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const UserDao = require("../dao/user-dao");
const FileShareDao = require("../dao/fileshare-dao");
const FolderShareDao = require("../dao/foldershare-dao");

router.post("/addshare", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    
    let { type } = req.body;
    let { currentFolder } = req.body;
    let { id } = req.body;
    let { user } = req.body;

    console.log(currentFolder)
    console.log(id)

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
        return res.redirect("/explorer/" + currentFolder);
    }

    const users = await new UserDao().getAllUsers();
    let ok = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i][0] == user) { ok = true; break; }
    }

    if (!ok) {
        res.cookie("msg", "Nincs ilyen felhasználó!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/explorer/" + currentFolder);
    }

    if (type == "file") {
        await new FileShareDao().addFileshare(user, id);
    } else if (type == "folder") {
        await new FolderShareDao().addFoldershare(user, id);
    }

    res.cookie("msg", (type == "file" ? "Fájl" : "Mappa") + " sikeresen megosztva!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/explorer/" + currentFolder);
});


router.post("/deleteshare", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;

    let { type } = req.body;
    let { currentFolder } = req.body;
    let { id } = req.body;
    let { user } = req.body;

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
        return res.redirect("/explorer/" + currentFolder);
    }

    const users = await new UserDao().getAllUsers();
    let ok = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i][0] == user) { ok = true; break; }
    }

    if (!ok) {
        res.cookie("msg", "Nincs ilyen felhasználó!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/explorer/" + currentFolder);
    }

    if (type == "file") {
        await new FileShareDao().deleteFileshare(user, id);
    } else if (type == "folder") {
        await new FolderShareDao().deleteFoldershare(user, id);
    }

    res.cookie("msg", (type == "file" ? "Fájl" : "Mappa") + " megosztás sikeresen törölve!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/explorer/" + currentFolder);
})

module.exports = router;