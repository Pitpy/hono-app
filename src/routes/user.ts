import { Hono } from "hono";
import { queryAll, queryOne, querySave } from "../config/db.sqlite"
import { ResObject } from "../types";

export const user = new Hono()

user.get('/', (c) => {
    const data = queryAll('SELECT * FROM users');
    let res: ResObject = {
        code: 10,
        message: 'success',
        data: data
    }
    return c.json(res)
}).get('/:id', (c) => {
    const data = queryOne('SELECT * FROM users WHERE id = $id', { params: { $id: c.req.param('id') } });
    let res: ResObject = {
        code: 10,
        message: 'success',
        data: data
    }
    return c.json(res)
}).post('/', async (c) => {
    let form = await c.req.json()
    form = {
        $name: form.name,
        $email: form.email,
        $phone: form.phone,
        $address: JSON.stringify(form.address)
    }
    const save = querySave('INSERT INTO users(name,email,phone,address) VALUES($name,$email,$phone,$address)', { params: [form] });

    let res: ResObject = {
        code: save ? 10 : 12,
        message: `save ${save ? 'success' : 'failed'}`,
    }

    if (save) return c.redirect("/api/user")
    return c.json(res)
}).put('/', async (c) => {
    let form = await c.req.json()
    form = {
        $id: form.id,
        $name: form.name,
        $email: form.email,
        $phone: form.phone,
        $address: JSON.stringify(form.address)
    }
    const save = querySave(`
        UPDATE users 
        SET name = $name, email = $email, phone = $phone, address = $address 
        WHERE id = $id`, { params: [form] });

    let res: ResObject = {
        code: save ? 10 : 12,
        message: `save ${save ? 'success' : 'failed'}`,
    }

    if (save) return c.redirect("/api/user")
    return c.json(res)
}).delete('/:id', (c) => {
    const del = querySave('DELETE FROM users WHERE id = $id', { params: [{ $id: c.req.param('id') }] });

    let res: ResObject = {
        code: del ? 10 : 12,
        message: `delete ${del ? 'success' : 'failed'}`,
    }

    if (del) return c.redirect("/api/user")
    return c.json(res)
})