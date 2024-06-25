import { Hono } from "hono";
import { ResObject } from "../types"

const user = new Hono();

user.get('/', (c) => {
    let res: ResObject = {
        code: 10,
        message: 'get success',
    }
    return c.json(res)
})

user.post('/', (c) => {
    let res: ResObject = {
        code: 10,
        message: 'post success',
    }
    return c.json(res)
})

export { user }