const oracledb = require('oracledb');

let connection;
async function runApp() {
    try {
        connection = await oracledb.getConnection({ user: "system", password: "'faszaseggedbe'", connectionString: "10.144.89.169/xepdb1" });
    } catch (err) {
        console.error(err);
    } finally {
        if (connection)
        {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }

    return connection;
}
module.exports = connection;
