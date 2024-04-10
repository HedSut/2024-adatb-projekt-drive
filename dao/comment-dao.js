const oracledb = require("oracledb");

class CommentDao {
    async addComment(author, fileid, text) {
        // TODO: using trigger add current date when inserted
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "comment" ("author", "file_id", "comment_text") VALUES (:authr, :fileid, :commentbody)',
            { authr: author, fileid: fileid, commentbody: text }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async getFileComments(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "comment" WHERE "file_id" = :fileid',
            { fileid: fileid }
        );
        con.close();
        return result.rows;
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
        return;
    }
}

module.exports = CommentDao;