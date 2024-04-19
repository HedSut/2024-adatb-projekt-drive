const oracledb = require("oracledb");

class FileDao {
    async addFile(filename, parentid, owneruser) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "file" ("parent_id", "owner_user", "file_name") VALUES (:parentid, :owneruser, :filename)',
            {
                parentid: parentid,
                owneruser: owneruser,
                filename: filename,
            }
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "file" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new file: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllFiles() {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "file"');
        con.close();
        console.log("Selected all files\n");
        return result.rows;
    }

    async getChildrenFiles(parentid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "file" WHERE "parent_id" = :parentid',
            { parentid: parentid }
        );
        con.close();
        console.log("Selected children files of folder with id " + parentid + "\n");
        return result.rows;
    }

    async getPublicFiles() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "file" WHERE "visibility" = :pb',
            {pb: "public"}
        );
        con.close();
        console.log("Selected all public files\n");
        return result.rows;
    }

    async getFile(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "file" WHERE "id" = :fileid',
            { fileid: fileid }
        );
        con.close();
        console.log("Selected file with id " + fileid + "\n");
        return result.rows[0];
    }

    async updateFileName(fileid, newname) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "file" SET "file_name" = :newname WHERE "id" = :fileid',
            { fileid: fileid, newname: newname }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Updated name of file with id " + fileid + " to " + newname + "\n");
        return;
    }

    async updateFileParent(fileid, parentid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "file" SET "parent_id" = :parentid WHERE "id" = :fileid',
            { fileid: fileid, parentid: parentid }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Updated parent of file with id " + fileid + " to " + parentid + "\n");
        return;
    }

    async updateFileVisibility(fileid, visibility) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "file" SET "visibility" = :visib WHERE "id" = :fileid',
            { fileid: fileid, visib: visibility }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Updated visibility of file with id " + fileid + " to " + visibility + "\n");
        return;
    }

    async deleteFile(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "file" WHERE "id" = :fileid',
            { fileid: fileid }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Deleted file with id " + fileid + "\n");
        return;
    }
}

module.exports = FileDao;