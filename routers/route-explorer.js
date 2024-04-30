const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const FolderDao = require("../dao/folder-dao");
const FolderShareDao = require("../dao/foldershare-dao");
const FileDao = require("../dao/file-dao");
const BookmarkDao = require("../dao/bookmark-dao");
const FileshareDao = require("../dao/fileshare-dao");
const FoldershareDao = require("../dao/foldershare-dao");

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

    var currentFolder;
    var files;
    var folders;
    var type;
    if (folderid == "root") {
        currentFolder = await new FolderDao().getUserRoot(username);
        if (currentFolder == null) {
            res.cookie("msg", "Nincs ilyen mappa!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/");
        }
        folders = await new FolderDao().getChildFolders(currentFolder[0]);
        files = await new FileDao().getChildrenFiles(currentFolder[0]);
        type = "root"
    } else if (folderid == "bookmarks") {
        folders = [];
        const bookmarks = await new BookmarkDao().getUserBookmarks(username);
        files = [];
        for (let i = 0; i < bookmarks.length; i++) {
            files.push(await new FileDao().getFile(bookmarks[i][1]));
        }
        return res.render("explorer", {
            folders: folders,
            files: files,
            currentFolder: ['nah'],
            msg: msg,
            username: username,
            type: "bookmarks"
        });
    } else if (folderid == "shared") {
        folders = [];
        files = [];
        const sharedfiles =  await new FileshareDao().getUserFileshares(username);
        const sharedfolders = await new FolderShareDao().getUserFoldershares(username);
        for (let i = 0; i < sharedfiles.length; i++) {
            files.push(await new FileDao().getFile(sharedfiles[i]));
        }

        for (let i = 0; i < sharedfolders.length; i++) {
            folders.push(await new FolderDao().getFolder(sharedfolders[i]));
        }

        return res.render("explorer", {
            folders: folders,
            files: files,
            currentFolder: ['nah'],
            msg: msg,
            username: username,
            type: "shares"
        });
    } else {
        currentFolder = await new FolderDao().getFolder(folderid);
        if (currentFolder == null) {
            res.cookie("msg", "Nincs ilyen mappa!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/");
        }
        folders = await new FolderDao().getChildFolders(currentFolder[0]);
        files = await new FileDao().getChildrenFiles(currentFolder[0]);
        type = "normal"
    }


    if (currentFolder != null && currentFolder[5] == "public") {
        return res.render("explorer", {
            folders: folders,
            files: files,
            currentFolder: currentFolder,
            msg: msg,
            username: username,
            type: type
        });
    }

    if (username) {
        if (currentFolder != null && currentFolder[3] == username) {
            return res.render("explorer", {
                folders: folders,
                files: files,
                currentFolder: currentFolder,
                msg: msg,
                username: username,
                type: type
            });
        }

        let share = await new FolderShareDao().getFolderShare(
            username,
            currentFolder[0]
        );
        if (share != null) {
            return res.render("explorer", {
                folders: folders,
                files: files,
                currentFolder: currentFolder,
                msg: msg,
                username: username,
                type: type
            });
        }
    }

    res.cookie("msg", "Nincs jogosultságod a mappa megtekintéséhez!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/");
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
    let { type } = req.body;
    let { currentFolder } = req.body;
    let username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (username) {
        let parentfolder = undefined;
        if (type === "folder") {
            parentfolder = await new FolderDao().getFolder(folderid);
        } else {
            file = await new FileDao().getFile(folderid);
            parentfolder = await new FolderDao().getFolder(folderid[1]);
        }
        siblingfolders = await new FolderDao().getChildFolders(parentfolder[2]);
        siblingfiles = await new FileDao().getChildrenFiles(parentfolder[2]);

        let freeName = true;
        for (let i = 0; i < siblingfolders.length; i++) {
            if (
                siblingfolders[i][0] !== folderid &&
                siblingfolders[i][1] === foldername
            ) {
                freeName = false;
            }
        }

        for (let i = 0; i < siblingfiles.length; i++) {
            if (
                siblingfiles[i][0] !== folderid &&
                siblingfiles[i][3] === foldername
            ) {
                freeName = false;
            }
            console.log(siblingfiles[i][3]);
        }

        if (freeName) {
            if (type === "folder") {
                await new FolderDao().updateFolderName(folderid, foldername);
            } else {
                await new FileDao().updateFileName(folderid, foldername);
            }

            res.cookie("msg", "Mappa sikeresen átnevezve", {
                httpOnly: true,
                maxAge: 1000,
            });
        }
    }

    if (type === "folder") {
        return res.redirect("explorer/" + currentFolder);
    }
});

router.post("/uploadfile", async (req, res) => {
    const token = req.cookies.jwt;
    let username;
    let { currentFolder } = req.body;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        res.cookie("msg", "Sikertelen fájlfeltöltés", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/explorer/" + currentFolder);
    }

    let uploadedFile = req.files.uploadedFile;
    const filename = uploadedFile.name;

    let record = await new FileDao().addFile(filename, currentFolder, username);

    let extension = filename.split(".");
    extension = extension[extension.length - 1];

    await uploadedFile.mv("./files/" + record[0] + "." + extension);
    return res.redirect("/explorer/" + currentFolder);
});

router.post("/exitfolder", async (req, res) => {
    let { currentFolder } = req.body;
    let parentfolder = await new FolderDao().getFolder(currentFolder);

    return res.redirect("/explorer/" + parentfolder[2]);
});

async function FindChildFilesRecursive(parentid) {
    let fileids = [];
    const folders = await new FolderDao().getChildFolders(parentid);
    const files = await new FileDao().getChildrenFiles(parentid);

    if (folders.length != 0) {
        for (let i = 0; i < folders.length; i++) {
            fileids.push(...(await FindChildFilesRecursive(folders[i][0])));
        }
    }

    if (files.length != 0) {
        for (let i = 0; i < files.length; i++) {
            fileids.push(files[i][0]);
        }
    }

    return fileids;
}

async function DeleteFile(username, fileid) {
    let msg = "Fájl sikeresen törölve!";
    const file = await new FileDao().getFile(fileid);

    if (file[2] != username) {
        msg = "Nincs engedélyed a fájl törléséhez!";
        return msg;
    }

    const filename = file[3];
    let extension = filename.split(".");
    extension = extension[extension.length - 1];
    let filepath = "./files/" + fileid + "." + extension;

    await fs.unlink(filepath);
    return msg;
}

router.post("/delete", async (req, res) => {
    const token = req.cookies.jwt;
    const { id } = req.body;
    const { currentFolder } = req.body;
    const { deletetype } = req.body;
    let username;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            username = decodedToken.username;
        });
    }


    if (deletetype == "folder") {
        const folder = await new FolderDao().getFolder(id);

        if (folder[3] != username) {
            res.cookie("msg", "Nincs engedélyed a mappa törléséhez!", {
                httpOnly: true,
                maxAge: 1000,
            });
            return res.redirect("/explorer/" + currentFolder);
        }

        const fileids = await FindChildFilesRecursive(id);
        if (fileids.length != 0) {
            for (let i = 0; i < fileids.length; i++) {
                await DeleteFile(username, fileids[i]);
            }
        }

        await new FolderDao().deleteFolder(id);

        res.cookie("msg", "Mappa sikeresen törölve!", {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/explorer/" + currentFolder);
    } 
    else if (deletetype == "file") {
        let msg = await DeleteFile(username, id);
        await new FileDao().deleteFile(id);

        res.cookie("msg", msg, {
            httpOnly: true,
            maxAge: 1000,
        });
        return res.redirect("/explorer/" + currentFolder);
    } 


    res.cookie("msg", "deletetype nem jó!", {
        httpOnly: true,
        maxAge: 1000,
    });
    return res.redirect("/explorer/" + currentFolder);
});


module.exports = router;