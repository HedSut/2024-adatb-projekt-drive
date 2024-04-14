const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret, userAuth } = require("../config/auth");
const bcrypt = require("bcryptjs");
const UserDao = require("../dao/user-dao");
const FolderDao = require("../dao/folder-dao")

router.post("/loginuser", async (req, res) => {
    let { username } = req.body;
    let { password } = req.body;

    const user = await new UserDao().getUser(username);

    if (!user) {
        res.cookie("msg", "Nincs ilyen felhasználó!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/login");
    } else {
        bcrypt.compare(password, user[2]).then(function (result) {
            if (result) {
                const token = jwt.sign({ username: username }, secret);
                res.cookie("jwt", token, { httpOnly: true });
                res.cookie("msg", "Sikeres bejelentkezés!", { httpOnly: true, maxAge: 1000 });
                return res.redirect("/");
            }
            else {
                res.cookie("msg", "Hibás jelszó!", { httpOnly: true, maxAge: 1000 });
                return res.redirect("/login");
            }
        });
    }
});


router.post("/registeruser", async (req, res) => {
    let { username } = req.body;
    let { password } = req.body;
    let { email } = req.body;
    let { passwordAgain } = req.body;

    if (!username || !email || !password || !passwordAgain) {
        res.cookie("msg", "Tölts ki minden mezőt!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    if (password != passwordAgain) {
        res.cookie("msg", "A két jelszó nem egyezik!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    let user = await new UserDao().getUser(username);
    if (user) {
        res.cookie("msg", "Már létezik fiók ilyen felhasználónévvel!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    user = await new UserDao().getUserByEmail(email);
    if (user) {
        res.cookie("msg", "Már létezik fiók ilyen email cimmel!", { httpOnly: true, maxAge: 1000 });
        return res.redirect("/register");
    }

    const hash = await bcrypt.hash(password, 10);
    await new UserDao().addUser(username, email, hash);
    await new FolderDao().addRootFolder(username);
    res.cookie("msg", "Fiók sikeresen létrehozva!", { httpOnly: true, maxAge: 1000 });
    return res.redirect("/login");
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
        for(let i = 0; i < folders.length; i++) {
            if(folders[i][1].match("Új mappa(?: \(\d+\))?")) {
                number++;
            }
        }

        await new FolderDao().addFolder("Új mappa" + (number == 0 ? "" : " (" + number + ")"), folderid, username)
    }
    res.cookie("msg", "Mappa sikeresen létrehozva!", { httpOnly: true, maxAge: 1000 });
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
        for(let i = 0; i < siblingfolders.length; i++) {
            if(siblingfolders[i][0] !== folderid && siblingfolders[i][1].trim() === foldername) {
                freeName = false;
            } 
        }


        if(freeName) {
            console.log("halokakakak");
            console.log(foldername);
            await new FolderDao().updateFolderName(folderid, foldername);
        }
    }
    res.cookie("msg", "Mappa sikeresen átnevezve", { httpOnly: true, maxAge: 1000 });
    return res.redirect("explorer/" + folderid);
});

module.exports = router;