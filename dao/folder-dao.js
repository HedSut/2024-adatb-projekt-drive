const oracledb = require("oracledb");

class FolderDao {
    async addFolder(name, parentid, owner) {
        // TODO: using trigger set visibility to private and add current date when inserted
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "folder" ("folder_name", "parent_id", "owner_user") VALUES (:folder_name, :parent_id, :owner_user)',
            { folder_name: name, parent_id: parentid, owner_user: owner }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async getUserRoot(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "owner_user" = :usr AND "parent_id" = null',
            { usr: username }
        );
        con.close();
        return result.rows[0];
    }

    async getFolder(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "id" = :folder_id',
            { folder_id: id }
        );
        con.close();
        return result.rows[0];
    }

    async getChildFolders(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "parent_id" = :folder_id',
            { folder_id: id }
        );
        con.close();
        return result.rows;
    }

    async updateFolderName(id, newname) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "folder" SET "folder_name" = :name WHERE "id" = :folder_id',
            { name: newname, folder_id: id }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async updateFolderVisibility(id, visibility) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "folder" SET "visibility" = :visibility WHERE "id" = :folder_id',
            { visibility: visibility, folder_id: id }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async deleteFolder(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "folder" WHERE "id" = :folder_id',
            { folder_id: id }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }
}

module.exports = FolderDao;
