const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao");
const FileDao = require("../dao/file-dao");

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

    if (!username) {
        res.cookie("msg", "Nem vagy bejelentkezve!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/");
    }

    let currentFolder;
    if (folderid == "root") {
        currentFolder = await new FolderDao().getUserRoot(username);
    } else {
        currentFolder = await new FolderDao().getFolder(folderid);
    }

    folders = await new FolderDao().getChildFolders(currentFolder[0]);
    files = await new FileDao().getChildrenFiles(currentFolder[0]);

    return res.render("explorer", {
        folders: folders,
        files: files,
        currentFolder: currentFolder,
        msg: msg,
        username: username,
    });
});