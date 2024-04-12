const jwt = require("jsonwebtoken");
const secret = "bff400ce52d119d3d95fc3d4e92d959708b333fc4158c850cac7d71c2d670ff4";

userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.cookie("msg", "Már be vagy jelentkezve!", {httpOnly: true, maxAge: 2000});
                return res.redirect("/");
            }
            else {
                if ((decodedToken.role !== "ROLE_USER") && (decodedToken.role !== "ROLE_ADMIN") && (decodedToken.role !== "ROLE_RESTAURANT")) {
                    res.cookie("msg", "Már be vagy jelentkezve!", {httpOnly: true, maxAge: 2000});
                    return res.redirect("/");
                }
                else {
                    next();
                }
            }
        })
    }
    else {
        res.cookie("msg", "Már be vagy jelentkezve!", {httpOnly: true, maxAge: 2000});
        return res.redirect("/");
    }
} 

module.exports = {userAuth, secret};