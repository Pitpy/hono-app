import * as mariadb from "mariadb";

export const pool2 = mariadb.createPool({
    connectionLimit: 5,
    host: "10.0.10.40",
    port: 3306,
    user: "root",
    password: "1234",
    database: "northwind",
});

(async () => {
    let conn = null;
    console.log("querying...");
    try {
        conn = await pool2.getConnection();
        const result = await conn.query("SELECT id, company, first_name, last_name FROM employees");
        console.table(result);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
})()