const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao");
const FileDao = require("../dao/file-dao");
const { DATE } = require("oracledb");

router.get("/", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    let folders = await new FolderDao().getPublicFolders();
    let files = await new FileDao().getPublicFiles();

    return res.render("index", {
        msg: msg,
        username: username,
        folders: folders,
        files: files
    });
});

module.exports = router;
