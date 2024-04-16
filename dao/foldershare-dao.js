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
        con.close();
        return;
    }

    async getFolderShare(username, folderid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "foldershare" WHERE "username" = :username AND "folderid" = :folderid',
            { username: username, folderid: folderid }
        );
        con.close();
        return result.rows[0];
    }

    async getUserFoldershares(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "foldershare" WHERE "username" = :username',
            { username: username }
        );
        con.close();
        return result.rows;
    }

    async getFolderFoldershares(folderid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "foldershare" WHERE "folderid" = :folderid',
            { folderid: folderid }
        );
        con.close();
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
        return;
    }
}

module.exports = FoldershareDao;