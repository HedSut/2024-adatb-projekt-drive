const oracledb = require("oracledb");

class CommentDao {
    async addComment(author, fileid, text) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "comment" ("author", "file_id", "comment_text") VALUES (:authr, :fileid, :commentbody)',
            { authr: author, fileid: fileid, commentbody: text }
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "comment" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new comment: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllComments() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "comment"',
            { }
        );
        con.close();
        console.log("Selected all comments\n");
        return result.rows;
    }

    async getFileComments(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "comment" WHERE "file_id" = :fileid',
            { fileid: fileid }
        );
        con.close();
        console.log("Selected comments of file " + fileid + "\n");
        return result.rows;
    }

    async getComment(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "comment" WHERE "id" = :id',
            { id: id }
        );
        con.commit();
        con.close();
        console.log("Selected comment with id " + id + "\n");
        return result.rows[0];
    }

    async deleteComment(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "comment" WHERE "id" = :commentid',
            { commentid: id }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Deleted comment with id " + id + "\n");
        return;
    }
}

module.exports = CommentDao;