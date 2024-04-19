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
        con.close();
        return;
    }

    async getAllRatings() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "rating"',
            { }
        );
        con.close();
        return result.rows[0];
    }

    async getFileRatings(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT COUNT(*) FROM "rating" WHERE "fileid" = :fileid',
            { fileid: fileid }
        );
        con.close();
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
        return;
    }
}

module.exports = RatingDao;