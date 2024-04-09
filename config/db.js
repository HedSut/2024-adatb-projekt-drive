const oracledb = require('oracledb');
const dotenv = require("dotenv");
dotenv.config({path: __dirname+"./../.env"});


class dbinit {
    async initdb() {
        await oracledb.createPool({
            user: process.env.DATABASEUSER,
            password: process.env.DATABASEPWD,
            connectString: process.env.DATABASECON
        });
    }
}

module.exports = dbinit;