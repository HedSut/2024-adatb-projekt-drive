const oracledb = require("oracledb");

class UserDao {
    async addUser(username, email, password) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'INSERT INTO "users" ("username", "email", "password") VALUES (:usr, :email, :passwd)',
            { usr: username, email: email, passwd: password }
        );
        console.log(result);
        con.commit();
        const rowid = result.lastRowid;
        result = await con.execute(
            'SELECT * FROM "users" WHERE ROWID = :lastRowid',
            { lastRowid: rowid }
        );
        con.close();
        console.log("Added new user: " + result.rows[0] + "\n");
        return result.rows[0];
    }

    async getAllUsers() {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "users"');
        con.close();
        console.log("Selected all users\n");
        return result.rows;
    }

    async getUser(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "users" WHERE "username" = :usr',
            { usr: username }
        );
        con.close();
        console.log("Selected user with username " + username + "\n");
        console.log(result.rows);
        return result.rows[0];
    }

    async getUserByEmail(email) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "users" WHERE "email" = :email',
            { email: email }
        );
        con.close();
        console.log("Selected user with email " + email + "\n");
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
        console.log("Updated email of user " + username + " to " + email + "\n");
        return;
    }

    async updatePassword(username, password) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'UPDATE "users" SET "password" = :newpass WHERE "username" = :usr',
            { usr: username, newpass: password }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Updated password of user " + username + "\n");
        return;
    }

    async deleteUser(username) {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'DELETE FROM "users" WHERE "username" = :usr',
            { usr: username }
        );
        console.log(result);
        con.commit();
        con.close();
        console.log("Deleted user " + username + "\n");
        return;
    }
}

module.exports = UserDao;
