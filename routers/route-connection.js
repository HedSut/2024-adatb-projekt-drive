const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

router.get("/connection", async (req, res) => {
    let con = await oracledb.getConnection();
    const version = con.oracleServerVersionString;
    const name = con.serviceName;

    return res.render("connection", {
        name: name,
        version: version
    });
});


module.exports = router;