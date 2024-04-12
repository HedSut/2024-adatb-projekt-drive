const oracledb = require("oracledb");

class UserDao {
    async addUser(username, email, password) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "users" VALUES (:usr, :email, :passwd, "user")',
            { usr: username, email: email, passwd: password }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async getAllUsers() {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "users"');
        con.close();
        return result.rows;
    }

    async getUser(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "users" WHERE "username" = :usr',
            { usr: username }
        );
        con.close();
        return result.rows[0];
    }

    async getUserByEmail(email) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "users" WHERE "email" = :email',
            { email: email }
        );
        con.close();
        return result.rows[0];
    }

    async updateEmail(username, email) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "users" SET "email" = :email WHERE "username" = :usr',
            { usr: username, email: email }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }

    async deleteUser() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "users" WHERE "username" = :usr',
            { usr: username }
        );
        console.log(result);
        con.commit();
        con.close();
        return;
    }
}

module.exports = UserDao;
