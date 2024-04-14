const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao");

router.get("/", async (req, res) => {
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

router.get("/explorer", async (req, res) => {
    const token = req.cookies.jwt;
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

            folderdao = new FolderDao();
            const folderID = req.params.folderID; //A folderID ami az url-ben át lett adva
            let currentFolderID = -1;
            if (folderID !== undefined && await folderdao.getFolder(folderID)[3] == username) {
                currentFolderID = folderID;
                console.log(folderID);
                folders = await folderdao.getChildFolders(folderID);
                res.render("explorer", { folders: folders, currentFolderID: currentFolderID });
            } else {
                res.redirect("/explorer");
            }
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
})

module.exports = router;