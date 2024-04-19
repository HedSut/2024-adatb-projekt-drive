const oracledb = require("oracledb");

class FoldershareDao {
    async addFoldershare(username, folderid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "foldershare" VALUES (:username, :folderid)',
            { username: username, folderid: folderid }
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "foldershare" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new foldershare: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllFolderShares() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "foldershare"',
            { }
        );
        con.close();
        console.log("Selected all foldershares\n");
        return result.rows;
    }

    async getFolderShare(username, folderid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "foldershare" WHERE "username" = :username AND "folderid" = :folderid',
            { username: username, folderid: folderid }
        );
        con.close();
        console.log("Selected foldershare of user " + username + " with id " + folderid + "\n");
        return result.rows[0];
    }

    async getUserFoldershares(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "foldershare" WHERE "username" = :username',
            { username: username }
        );
        con.close();
        console.log("Selected foldershares of user " + username + "\n");
        return result.rows;
    }

    async getFolderFoldershares(folderid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "foldershare" WHERE "folderid" = :folderid',
            { folderid: folderid }
        );
        con.close();
        console.log("Selected foldershares of folder with id " + folderid + "\n");
        return result.rows;
    }

    async deleteFoldershare(username, folderid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "foldershare" WHERE "username" = :username AND "folderid" = :folderid',
            { username: username, folderid: folderid }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Deleted foldershare of user " + username + " and with id " + folderid + "\n");
        return;
    }
}

module.exports = FoldershareDao;