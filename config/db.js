const oracledb = require('oracledb');


async function runApp() {
    let connection;
    try {
        connection = await oracledb.getConnection({ user: "demonode", password: "XXXX", connectionString: "localhost/xepdb1" });
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
module.exports = runApp();
