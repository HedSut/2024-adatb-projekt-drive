const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao");
const FileDao = require("../dao/file-dao");
const FileshareDao = require("../dao/fileshare-dao");
const RatingsDao = require("../dao/rating-dao");


router.get("/file/:id", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    const fileid = req.params.id;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    let file = await new FileDao().getFile(fileid);
    if (file == null) {
        res.cookie("msg", "Nincs ilyen fájl!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/"); 
    }

    let rating = await new RatingsDao().getFileRatings(fileid);

    if (file[4] == "public") {
        return res.render("file", {
            file: file,
            rating: rating[0],
            msg: msg,
            username: username
        });
    }

    
    if (username) {
        if (file[2] == username) {
            return res.render("file", {
                file: file,
                rating: rating[0],
                msg: msg,
                username: username
            });
        }

        let share = await new FileshareDao().getFileShare(fileid, username);
        if (share != null) {
            return res.render("file", {
                file: file,
                rating: rating[0],
                msg: msg,
                username: username
            });
        }
    }

    res.cookie("msg", "Nincs jogod a fájl megnézéséhez!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/");
});


router.post("/changevisibility", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    const { fileid } = req.body;
    const { visibility } = req.body;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (!username) {
        res.cookie("msg", "Nincs jogosultságod ehhez!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/");
    }


    await new FileDao().updateFileVisibility(fileid, visibility);
    res.cookie("msg", "Fájl láthatósága sikeresen módosítva!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/file/" + fileid);
});

module.exports = router;