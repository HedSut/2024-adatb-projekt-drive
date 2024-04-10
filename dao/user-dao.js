const oracledb = require("oracledb");

class UserDao {
    async addUser(username, email, password) {
        let con = await oracledb.getConnection();
        let result = await con.execute('INSERT INTO "users" VALUES (:user, :email, :pass)', {user: username, email: email, pass: password});
        con.close();
        return result.rows;
    }

    async getAllUsers() {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "users"');
        con.close();
        return result.rows;
    }

    async getUsers(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "users" WHERE username = :user', {user: username});
        con.close();
        return result.rows[0];
    }

    async updateEmail(username, email) {
        let con = await oracledb.getConnection();
        let result = await con.execute('UPDATE "users" SET email = :email WHERE username = :user', {user: username, email: email});
        con.close();
        return result.rows;
    }

    async deleteUser() {
        let con = await oracledb.getConnection();
        let result = await con.execute('DELETE FROM "users" WHERE username = :user', {user: username});
        con.close();
        return result.rows;
    }
}

module.exports = UserDao;