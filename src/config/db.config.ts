import { Database } from "bun:sqlite";

const db = new Database("app.sqlite");

type Options = {
    params?: any;
    jsonFields?: string[]
}

export { db };

export function queryAll(sql: string, opt?: Options) {
    try {
        const results = db.query(sql).all(opt?.params);
        return results;
    } catch (error: any) {
        console.log('queryAll:', error.message);
        return error.message;
    }
}

export function queryOne(sql: string, opt?: Options) {
    try {
        const results = db.query(sql).get(opt?.params);
        return results;
    } catch (error: any) {
        console.log('queryOne:', error.message);
        return error.message;
    }
}

export function querySave(sql: string, opt?: Options) {
    try {
        const stmt = db.prepare(sql);
        const values = db.transaction(value => {
            for (const v of value) stmt.run(v);
            return value.length;
        });
        const count = values(opt?.params);
        return count;
    } catch (error: any) {
        console.log('querySave:', error.message);
        return error.message;
    }
}
