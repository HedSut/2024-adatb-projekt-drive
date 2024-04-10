const oracledb = require("oracledb");

class BookmarkDao {
    async addFileshare(username, fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "bookmark" VALUES (:username, :fileid)',
            { username: username, fileid: fileid }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async getUserBookmarks(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "bookmark" WHERE "username" = :username',
            { username: username }
        );
        con.close();
        return result.rows;
    }

    async getFileBookmarks(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "bookmark" WHERE "fileid" = :fileid',
            { fileid: fileid }
        );
        con.close();
        return result.rows;
    }

    async deleteBookmark(username, fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "bookmark" WHERE "username" = :username AND "fileid" = :fileid',
            { username: username, fileid: fileid }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }
}

module.exports = BookmarkDao;