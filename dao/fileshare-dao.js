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
        con.close();
        return;
    }

    async getAllFileShares() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare"',
            { }
        );
        con.close();
        return result.rows;
    }

    async getUserFileshares(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare" WHERE "username" = :username',
            { username: username }
        );
        con.close();
        return result.rows;
    }

    async getFileFileshares(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare" WHERE "fileid" = :fileid',
            { fileid: fileid }
        );
        con.close();
        return result.rows;
    }

    async getFileShare(fileid, username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "fileshare" WHERE "fileid" = :fileid AND "username" = :usr',
            { fileid: fileid, usr: username }
        );
        con.close();
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
        return;
    }
}

module.exports = FileshareDao;