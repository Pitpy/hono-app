import * as mariadb from "mariadb"

const pool = mariadb.createPool({
    host: "localhost",
    database: 'stock_manager',
    port: 3306,
    user: 'root',
    password: '1234',
    multipleStatements: true,
    connectionLimit: 10,
    dateStrings: true,
    bigNumberStrings: true,
    decimalAsNumber: true,
    supportBigNumbers: true,
    namedPlaceholders: true,
    typeCast(field, next) {
        if (field.type === 'TINY')
            return (field.string() == '1');
        return next();
    }
})

type Options = {
    params?: any;
    jsonfield?: string[]
    namedPlaceholders?: boolean;
}

export async function queryAll(query: string, opt?: Options) {
    let conn = null;

    try {
        conn = await pool.getConnection();
        const results = await conn.query(query, opt?.params)
        if (!results.length) return null;
        if (opt?.jsonfield) return jsonConvertor(results, opt.jsonfield);
        return results;
    } catch (error) {
        throw error;
    } finally {
        conn?.release()
    }
}

function jsonConvertor(value: any, jsonfield: string[]) {
    if (value instanceof Array) {
        value.map((v) => {
            for (let k of jsonfield) {
                if (v[k]) v[k] = JSON.parse(v[k]);
            }
            return v;
        });
        return value;
    } else if (value instanceof Object) {
        let v = {};
        for (let k of jsonfield) {
            if (value[k]) k = JSON.parse(value[k]);
        }
        return v;
    }
    return null;
}
