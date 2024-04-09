const oracledb = require("oracledb");

class UserDao {
    async getAllUsers() {
        let con = await oracledb.getConnection();
        let result = await con.execute('SELECT * FROM "bookmark"');

        console.log(result);
        //return results.resultSet;
        con.close();
        return;
    }
}

module.exports = UserDao;