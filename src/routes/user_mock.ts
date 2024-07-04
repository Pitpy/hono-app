import { Hono } from "hono";
import type { ResObject } from "../types"
import { getAll, getById, addUser, delUser } from "../models/users"

const user = new Hono();

user.get('/', async (c) => {
    let res: ResObject = {
        code: 10,
        message: 'success',
        data: await getAll()
    }
    return c.json(res)
})

user.get('/:id', async (c) => {
    let res: ResObject = {
        code: 10,
        message: 'success',
        data: await getById(c.req.param('id'))
    }
    return c.json(res)
})

user.post('/', async (c) => {
    const body = await c.req.json()
    const isAdd = await addUser(body)
    let res: ResObject = {
        code: isAdd ? 10 : 12,
        message: `add ${isAdd ? 'success' : 'failed'}`,
    }
    if (isAdd) return c.redirect("/api/user")
    return c.json(res)
})

user.delete('/:id', async (c) => {
    const isDel = await delUser(c.req.param('id'))
    let res: ResObject = {
        code: isDel ? 10 : 12,
        message: `delete ${isDel ? 'success' : 'failed'}`,
    }
    if (isDel) return c.redirect("/api/user")
    return c.json(res)
})

export { user }