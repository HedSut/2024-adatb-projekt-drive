const oracledb = require("oracledb");

class FolderDao {
    async addFolder(name, parentid, owner) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "folder" ("folder_name", "parent_id", "owner_user") VALUES (:foldername, :parentid, :owneruser)',
            { foldername: name, parentid: parentid, owneruser: owner }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async addRootFolder(owner) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "folder" ("folder_name", "owner_user") VALUES (:foldername, :owneruser)',
            { foldername: 'Saját Mappa', owneruser: owner}
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async getUserRoot(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "owner_user" = :usr AND "parent_id" IS NULL',
            { usr: username }
        );
        con.close();
        return result.rows[0];
    }

    async getFolder(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "id" = :folderid',
            { folderid: id }
        );
        con.close();
        return result.rows[0];
    }

    async getChildFolders(parentid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "parent_id" = :folderid',
            { folderid: parentid }
        );
        con.close();
        return result.rows;
    }

    async getPublicFolders() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "visibility" = "public"'
        );
        con.close();
        return result.rows;
    }

    async updateFolderName(id, newname) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "folder" SET "folder_name" = :name WHERE "id" = :folderid',
            { name: newname, folderid: id }
        );
        con.commit();
        con.close();
        return;
    }

    async updateFolderVisibility(id, visibility) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "folder" SET "visibility" = :visibility WHERE "id" = :folderid',
            { visibility: visibility, folderid: id }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async deleteFolder(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "folder" WHERE "id" = :folderid',
            { folderid: id }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }
}

module.exports = FolderDao;
