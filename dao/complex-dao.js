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

    async getFolderStats() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'Select "folder"."folder_name", "folder"."owner_user" , cpe2.cnt from "folder" \
            INNER JOIN (select "folder"."id", COUNT("file"."id") AS cnt FROM "folder" INNER JOIN "file" ON \
            "folder"."id" = "file"."parent_id" GROUP BY  "folder"."id") cpe2 ON "folder"."id" = cpe2."id"',
            { }
        );
        con.close();
        console.log("Selected folder statistics\n");
        return result.rows;
    }

    async getChildfolderStats() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT f1."folder_name", f1."owner_user", f2.child_folder_count FROM "folder" f1 \
            INNER JOIN (SELECT "parent_id", COUNT("id") AS child_folder_count FROM "folder" GROUP BY "parent_id") f2 \
            ON f1."id" = f2."parent_id"',
            { }
        );
        con.close();
        console.log("Selected folder statistics\n");
        return result.rows;
    }
}

module.exports = ComplexDao;