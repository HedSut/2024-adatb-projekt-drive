const oracledb = require("oracledb");

class BookmarkDao {
    async addBookmark(username, fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "bookmark" VALUES (:username, :fileid)',
            { username: username, fileid: fileid }
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "bookmark" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new bookmark: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllBookmarks() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "bookmark"',
            { }
        );
        con.close();
        console.log("Selected all bookmarks\n");
        return result.rows;
    }

    async getUserBookmarks(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "bookmark" WHERE "username" = :username',
            { username: username }
        );
        con.close();
        console.log("Selected bookmarks of user " + username + "\n");
        return result.rows;
    }

    async getFileBookmarks(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "bookmark" WHERE "fileid" = :fileid',
            { fileid: fileid }
        );
        con.close();
        console.log("Selected bookmarks of file " + fileid + "\n");
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
        console.log("Deleted bookmark of user " + username + " and file " + fileid + "\n");
        return;
    }
}

module.exports = BookmarkDao;