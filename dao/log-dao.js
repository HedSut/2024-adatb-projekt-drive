const oracledb = require("oracledb");

class LogDao {
    async getLogs() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "log"',
            { }
        );
        con.close();
        console.log("Selected all logs\n");
        return result.rows;
    }
}

module.exports = LogDao;