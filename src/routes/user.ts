import { Hono } from "hono";

const user = new Hono();

user.get('/', (c) => {
    return c.json({
        code: 10,
        message: 'get success',
    })
})

user.post('/', (c) => {
    return c.json({
        code: 10,
        message: 'post success',
    })
})

export { user }