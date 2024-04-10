const oracledb = require("oracledb");

class FolderDao {
    async addFolder(name, parentid, owner) { // TODO: using trigger set visibility to private and add current date when inserted
        let con = await oracledb.getConnection();
        let result = await con.execute('INSERT INTO "folder" ("folder_name", "parent_id", "owner_user") VALUES (:name, :parent, :owner)', {name: name, parent: parentid, owner: owner});
        con.commit();
        con.close();
        return result.rows;
    }

    async getUserRoot(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "folder" WHERE owner_user = :user AND parent_id = null', {user: username});
        con.close();
        return result.rows[0];
    }

    async getFolder(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "folder" WHERE id = :id', {id: id});
        con.close();
        return result.rows[0];
    }

    async getChildFolders(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "folder" WHERE parent_id = :id', {id: id});
        con.close();
        return result.rows;
    }

    async updateFolderName(id, newname) {
        let con = await oracledb.getConnection();
        let result = await con.execute('UPDATE "folder" SET folder_name = :name WHERE id = :id', {name: newname, id: id});
        con.close();
        return result.rows;
    }

    async updateFolderVisibility(id, visibility) {
        let con = await oracledb.getConnection();
        let result = await con.execute('UPDATE "folder" SET visibility = :visibility WHERE id = :id', {visibility: visibility, id: id});
        con.close();
        return result.rows;
    }

    async deleteFolder(id) {
        let con = await oracledb.getConnection();
        let result = await con.execute('DELETE FROM "folder" WHERE id = :id', {id: id});
        con.close();
        return result.rows;
    }
}

module.exports = FolderDao;