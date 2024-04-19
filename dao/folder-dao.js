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
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "folder" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new folder: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async addRootFolder(owner) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "folder" ("folder_name", "owner_user") VALUES (:foldername, :owneruser)',
            { foldername: 'Saját Mappa', owneruser: owner}
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "folder" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new root folder: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllFolders() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder"',
            { }
        );
        con.close();
        console.log("Selected all folders\n");
        return result.rows;
    }

    async getUserRoot(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "owner_user" = :usr AND "parent_id" IS NULL',
            { usr: username }
        );
        con.close();
        console.log("Selected root folder of user" + username + "\n");
        return result.rows[0];
    }

    async getFolder(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "id" = :folderid',
            { folderid: id }
        );
        con.close();
        console.log("Selected folder with id " + id + "\n");
        return result.rows[0];
    }

    async getChildFolders(parentid) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "parent_id" = :folderid',
            { folderid: parentid }
        );
        con.close();
        console.log("Selected child folders of folder with id " + parentid + "\n");
        return result.rows;
    }

    async getPublicFolders() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "folder" WHERE "visibility" = :pb',
            { pb: "public" }
        );
        con.close();
        console.log("Selected all public folders\n");
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
        console.log("Updated folder name of folder with id " + id + " to " + newname + "\n");
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
        console.log("Updated folder visibility of folder with id " + id + " to " + visibility + "\n");
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
        console.log("Deleted folder with id " + id + "\n");
        return;
    }
}

module.exports = FolderDao;
