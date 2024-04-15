const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao");
const FileDao = require("../dao/file-dao");

router.get("/explorer/:id", async (req, res) => {
    const token = req.cookies.jwt;
    const msg = req.cookies.msg;
    const folderid = req.params.id;
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
        folders = await new FolderDao().getChildFolders(folderid);

        let takenName = false;
        let number = 0;
        for (let i = 0; i < folders.length; i++) {
            if (folders[i][1].match("Új mappa(?: (d+))?")) {
                number++;
            }
        }

        await new FolderDao().addFolder(
            "Új mappa" + (number == 0 ? "" : " (" + number + ")"),
            folderid,
            username
        );
    }
    res.cookie("msg", "Mappa sikeresen létrehozva!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("explorer/" + folderid);
});

router.post("/renamefolder", async (req, res) => {
    const token = req.cookies.jwt;
    let { folderid } = req.body;
    let { foldername } = req.body;
    let username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (username) {
        parentfolder = await new FolderDao().getFolder(folderid);
        siblingfolders = await new FolderDao().getChildFolders(parentfolder[2]);

        let freeName = true;
        for (let i = 0; i < siblingfolders.length; i++) {
            if (
                siblingfolders[i][0] !== folderid &&
                siblingfolders[i][1].trim() === foldername
            ) {
                freeName = false;
            }
        }

        if (freeName) {
            console.log("halokakakak");
            console.log(foldername);
            await new FolderDao().updateFolderName(folderid, foldername);
        }
    }
    res.cookie("msg", "Mappa sikeresen átnevezve", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("explorer/" + folderid);
});

module.exports = router;
