const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao");
const FileDao = require("../dao/file-dao");

router.get("/", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        })
    }

    console.log(username);

    return res.render("index", {
        msg: msg,
        username: username
    })
});


router.get("/login", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
            res.cookie("msg", "Már be vagy jelentkezve!", { httpOnly: true, maxAge: 1000 });
            return res.redirect("/");
        })
    }

    return res.render("login", {
        msg: msg,
        username: username,
    });
});


router.get("/logout", async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("msg", "Sikeres kijelentkezés!", { httpOnly: true, maxAge: 1000 });
    res.redirect("/");
});


router.get("/register", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    var username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
            res.cookie("msg", "Már be vagy jelentkezve!", { httpOnly: true, maxAge: 1000 });
            return res.redirect("/");
        })
    }

    return res.render("registration", {
        msg: msg,
        username: username
    });
});


router.get("/explorer/:id", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    const folderid = req.params.id;
    var username;
    
    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            username = decodedToken.username;

            folderdao = new FolderDao();
            root = await folderdao.getUserRoot(username);
            let currentFolderID = root[0];

            folders = await folderdao.getChildFolders(root[0]);
            console.log(folders)
            res.render("explorer", { folders: folders, currentFolderID: currentFolderID });
        })
    }

    //TODO: itt majd a loginra kell átdobjon, ez csak tesztelni van itt
    return res.render("explorer", {
        folders: [
            { name: 'Folder 1', folder_id: 1 },
            { name: 'Folder 2', folder_id: 2 },
            { name: 'Folder 3', folder_id: 3 }
        ],
        currentFolderID: req.params.folderID
    });
});

router.get("/explorer/:folderID", async (req, res) => {
    const token = req.cookies.jwt;
    var username;

    if (token) {
        jwt.verify(token, secret, async (err, decodedToken) => {
            username = decodedToken.username;
        })
    }

    if (!username) {
        res.cookie("msg", "Nem vagy bejelentkezve!", { httpOnly: true, maxAge: 1000 });
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
        username: username
    });
});

module.exports = router;