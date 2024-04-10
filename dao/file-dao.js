const oracledb = require("oracledb");

class FileDao {
    async addFile(filename, parentid, owneruser, extension) {
        // TODO: using trigger set visibility to private and add current date when inserted
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "file" ("parent_id", "owner_user", "file_name", "filetype") VALUES (:parentid, :owneruser, :filename, :fileextension)',
            {
                parentid: parentid,
                owneruser: owneruser,
                filename: filename,
                fileextension: extension,
            }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async getAllFiles() {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "file"');
        con.close();
        return result.rows;
    }

    async getChildrenFiles(parentid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "file" WHERE "parent_id" = :parentid',
            { parentid: parentid }
        );
        con.close();
        return result.rows;
    }

    async getPublicFiles() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "file" WHERE "visibility" = "public"'
        );
        con.close();
        return result.rows;
    }

    async getFile(fileid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "file" WHERE "id" = :fileid',
            { fileid: fileid }
        );
        con.close();
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
        return;
    }
}

module.exports = FileDao;