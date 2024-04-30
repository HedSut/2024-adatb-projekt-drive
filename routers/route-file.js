const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const mime = require("mime");
const UserDao = require("../dao/user-dao");
const FileDao = require("../dao/file-dao");
const FileshareDao = require("../dao/fileshare-dao");
const RatingsDao = require("../dao/rating-dao");
const CommentDao = require("../dao/comment-dao");
const BookmarkDao = require("../dao/bookmark-dao");
const fs = require("fs/promises");
const { waitForDebugger } = require("inspector");

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
    let comment = await new CommentDao().getFileComments(fileid);
    let bookmark = await new BookmarkDao().getBookmark(username, fileid);
    //console.log(rating);
    if (file[4] == "public") {
        return res.render("file", {
            file: file,
            rating: rating,
            msg: msg,
            username: username,
            comment: comment,
            isBookmark: bookmark != null
        });
    }

    if (username) {
        if (file[2] == username) {
            return res.render("file", {
                file: file,
                rating: rating[0],
                msg: msg,
                username: username,
                comment: comment,
                isBookmark: bookmark != null
            });
        }

        let share = await new FileshareDao().getFileShare(fileid, username);
        if (share != null) {
            return res.render("file", {
                file: file,
                rating: rating[0],
                msg: msg,
                username: username,
                comment: comment,
                isBookmark: bookmark != null
            });
        }
    }

    res.cookie("msg", "Nincs jogod a fájl megnézéséhez!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/");
});

router.post("/addcomment", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    let { fileid } = req.body;
    let { text } = req.body;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (username) {
        await new CommentDao().addComment(username, fileid, text);
    }
    res.cookie("msg", "Hozzászólás sikeresen közzétéve!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/file/" + fileid);
});

router.post("/deletecomment", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    let { commentid } = req.body;
    let { fileid } = req.body;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    let comment = await new CommentDao().getComment(commentid);
    if (username && username === comment[1]) {
        await new CommentDao().deleteComment(commentid);
    }
    console.log(comment);

    res.cookie("msg", "Hozzászólás sikeresen törölve!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/file/" + fileid);
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
        res.setHeader(
            "Content-disposition",
            "attachment; filename=" + filename
        );
        res.setHeader("Content-type", mimetype);
        return res.download(filepath, filename);
    }

    if (username) {
        if (file[2] == username) {
            res.setHeader(
                "Content-disposition",
                "attachment; filename=" + filename
            );
            res.setHeader("Content-type", mimetype);
            return res.download(filepath, filename);
        }

        let share = await new FileshareDao().getFileShare(fileid, username);
        if (share != null) {
            res.setHeader(
                "Content-disposition",
                "attachment; filename=" + filename
            );
            res.setHeader("Content-type", mimetype);
            return res.download(filepath, filename);
        }
    }

    res.cookie("msg", "Nincs engedélyed a fájl letöltéséhez!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/");
});

router.post("/ratefile", async (req, res) => {
    const token = req.cookies.jwt;
    const {fileid, value} = req.body;
    const ratingvalue = Number(value);
    var username;
    
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    const rating = await new RatingsDao().getFileRating(username, fileid);
    if (rating != null) {
        return res.redirect("/file/" + fileid);
    }

    await new RatingsDao().addRating(username, fileid, ratingvalue);

    return res.redirect("/file/" + fileid);
});

router.post("/addbookmark", async (req, res) => {
    const token = req.cookies.jwt;
    const { fileid } = req.body;
    var username;
    
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    await new BookmarkDao().addBookmark(username, fileid);
    return res.redirect("/file/" + fileid);
})

router.post("/deletebookmark", async (req, res) => {
    const token = req.cookies.jwt;
    const { fileid } = req.body;
    var username;
    
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    await new BookmarkDao().deleteBookmark(username, fileid);
    return res.redirect("/file/" + fileid);
})

module.exports = router;
