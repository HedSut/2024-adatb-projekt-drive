const oracledb = require("oracledb");

class LogDao {
    async getLogs() {
        let con = await oracledb.getConnection();
        let result = await con.execute(
            'SELECT * FROM "log" ORDER BY "table", "date"',
            { }
        );
        con.close();
        console.log("Selected all logs\n");
        return result.rows;
    }

    async getLogsOfTable(table) {
        const bindVars = {
            tbl: table,
            p_output: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
        };
        

        let con = await oracledb.getConnection();
        let result = await con.execute(
            `BEGIN
                "print_log_table"(:p_output, :tbl); 
            END;`,
            bindVars
        );
        
        console.log(table)
        let resultSet = result.outBinds.p_output;
        let rows = await resultSet.getRows(10); // Fetching 10 rows
        console.log(rows); // Do whatever you need with the fetched rows


        con.close();
        console.log("Selected all logs\n");
        return result;
    }
}

module.exports = LogDao;