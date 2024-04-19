const oracledb = require("oracledb");

class FileshareDao {
    async addFileshare(username, fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "fileshare" VALUES (:username, :fileid)',
            { username: username, fileid: fileid }
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "fileshare" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new fileshare: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllFileShares() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare"',
            { }
        );
        con.close();
        console.log("Selected all fileshares\n");
        return result.rows;
    }

    async getUserFileshares(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare" WHERE "username" = :username',
            { username: username }
        );
        con.close();
        console.log("Selected fileshares of user " + username + "\n");
        return result.rows;
    }

    async getFileFileshares(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare" WHERE "fileid" = :fileid',
            { fileid: fileid }
        );
        con.close();
        console.log("Selected fileshares of file with id " + fileid + "\n");
        return result.rows;
    }

    async getFileShare(fileid, username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare" WHERE "fileid" = :fileid AND "username" = :usr',
            { fileid: fileid, usr: username }
        );
        con.close();
        console.log("Selected fileshare of user " + username + " and with id of " + fileid + "\n");
        return result.rows[0];
    }

    async deleteFileshare(username, fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "fileshare" WHERE "username" = :username AND "fileid" = :fileid',
            { username: username, fileid: fileid }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Deleted fileshare of user " + username + " and with id of " + fileid + "\n");
        return;
    }
}

module.exports = FileshareDao;