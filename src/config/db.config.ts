import { Database } from "bun:sqlite";

const db = new Database("app.sqlite");

type Option = {
    params?: Record<string, any>;
    jsonFields?: string[]
}

export function queryAll(sql: string, opt?: Option) {
    try {
        const query = db.query(sql)
        const results = query.all(opt?.params || {});
        return results;
    } catch (error: any) {
        console.log('queryAll:', error.message);
        return error.message;
    }
}

export function queryOne(sql: string, opt?: Option) {
    try {
        const query = db.query(sql)
        const results = query.get(opt?.params || {});
        return results;
    } catch (error: any) {
        console.log('queryOne:', error.message);
        return error.message;
    }
}

export function querySave(sql: string, opt?: Option) {
    try {
        const insert = db.prepare(sql);
        const values = db.transaction(value => {
            for (const v of value) insert.run(v);
            return value.length;
        });
        const count = values([opt?.params]);
        return Number(count);
    } catch (error: any) {
        console.log('querySave:', error.message);
        return error.message;
    }
}
