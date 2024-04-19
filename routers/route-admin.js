const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const UserDao = require("../dao/user-dao");
const BookmarkDao = require("../dao/bookmark-dao");
const CommentDao = require("../dao/comment-dao");
const FileDao = require("../dao/file-dao");
const FileshareDao = require("../dao/fileshare-dao");
const FolderDao = require("../dao/folder-dao");
const FoldershareDao = require("../dao/foldershare-dao");
const RatingDao = require("../dao/rating-dao");

router.get("/admin", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    const user = await new UserDao().getUser(username);
    if (user[3] != "admin") {
        res.cookie("msg", "Nincs jogod megtekinteni ezt az oldalt!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/");
    }


    const users = await new UserDao().getAllUsers();
    const bookmarks = await new BookmarkDao().getAllBookmarks();
    const comments = await new CommentDao().getAllComments();
    const files = await new FileDao().getAllFiles();
    const fileshares = await new FileshareDao().getAllFileShares();
    const folders = await new FolderDao().getAllFolders();
    const foldershares = await new FoldershareDao().getAllFolderShares();
    const ratings = await new RatingDao().getAllRatings();

    console.log("ratings: " + ratings);
    console.log("foldershares: " + foldershares);
    console.log("ratings: " + ratings);
    return res.render("admin", {
        users: users,
        bookmarks: bookmarks,
        comments: comments,
        files: files,
        fileshares: fileshares, 
        folders: folders,
        foldershares: foldershares,
        ratings: ratings,
        username: username,
        msg: msg
    });
})


module.exports = router;