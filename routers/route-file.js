const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const mime = require("mime");
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


router.get("/download/:id", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    const fileid = req.params.id;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    const file = await new FileDao().getFile(fileid);
    if (file == null) {
        res.cookie("msg", "Nincs ilyen fájl!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/"); 
    }

    const filename = file[3];
    let extension = filename.split(".");
    extension = extension[extension.length - 1];

    var filepath = "./files/" + fileid + "." + extension;
    var mimetype = mime.getType(filename);

    if (file[4] == "public") {
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        return res.download(filepath, filename);
    }
    
    if (username) {
        if (file[2] == username) {
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            return res.download(filepath, filename);
        }

        let share = await new FileshareDao().getFileShare(fileid, username);
        if (share != null) {
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            return res.download(filepath, filename);
        }
    }

    res.cookie("msg", "Nincs engedélyed a fájl letöltéséhez!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/");
});

module.exports = router;