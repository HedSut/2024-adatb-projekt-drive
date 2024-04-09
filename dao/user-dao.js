const con = require("./../config/db");

class UserDao {
    async getAllUsers() {
        let results = await con.execute("SELECT * FROM 'users'");
        console.log(results);
        //return results.resultSet;
        return;
    }
}

module.exports = UserDao;