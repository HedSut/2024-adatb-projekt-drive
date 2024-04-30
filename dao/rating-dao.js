const oracledb = require("oracledb");

class RatingDao {
    async addRating(username, fileid, rating) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "rating" VALUES (:username, :fileid, :rating)',
            { username: username, fileid: fileid, rating: rating }
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "rating" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new rating: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllRatings() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "rating"',
            { }
        );
        con.close();
        return result.rows;
    }

    async getFileRatings(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT SUM("rate") FROM "rating" WHERE "fileid" = :fileid',
            { fileid: fileid }
        );
        con.close();
        console.log("Selected ratings of file with id " + fileid + "\n");
        return result.rows[0];
    }

    async getFileRating(username, fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "rating" WHERE "fileid" = :fileid AND "username" = :usern',
            { fileid: fileid, usern: username }
        );
        con.close();
        console.log("Selected ratings of file with id " + fileid + " of user " + username +"\n");
        return result.rows[0];
    }

    async updateRating(username, fileid, rating) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "rating" SET "rate" = :rating WHERE "username" = :username AND "fileid" = :fileid',
            { username: username, fileid: fileid, rating: rating }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Updated rating of user " + username + " and file with id " + fileid + " to " + rating + "\n");
        return;
    }

    async deleteRating(username, fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "rating" WHERE "username" = :username AND "fileid" = :fileid',
            { username: username, fileid: fileid }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Deleted rating of user " + username + " and file with id " + fileid + "\n");
        return;
    }
}

module.exports = RatingDao;