const oracledb = require("oracledb");

class ComplexDao {
    async getFoldershareStats() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT "folder"."folder_name", COUNT(*) FROM "folder" INNER JOIN "foldershare" ON "folder"."id" = "foldershare"."folderid" GROUP BY "folder"."folder_name"',
            { }
        );
        con.close();
        console.log("Selected foldershare statistics\n");
        return result.rows;
    }

    async getFileshareStats() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT "file"."file_name", COUNT(*) FROM "file" INNER JOIN "fileshare" ON "file"."id" = "fileshare"."fileid" GROUP BY "file"."file_name"',
            { }
        );
        con.close();
        console.log("Selected fileshare statistics\n");
        return result.rows;
    }

    async getFileRatingStats() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT "file"."file_name", SUM("rating"."rate") FROM "file" INNER JOIN "rating" ON "file"."id" = "rating"."fileid" GROUP BY "file"."file_name"',
            { }
        );
        con.close();
        console.log("Selected file ratings statistics\n");
        return result.rows;
    }

    async getFileBookmarkStats() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT "file"."file_name", COUNT(*) FROM "file" INNER JOIN "bookmark" ON "file"."id" = "bookmark"."fileid" GROUP BY "file"."file_name"',
            { }
        );
        con.close();
        console.log("Selected file bookmarks statistics\n");
        return result.rows;
    }
}

module.exports = ComplexDao;