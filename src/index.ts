import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { csrf } from 'hono/csrf'

import { appendFileSync } from "node:fs";

import { basic } from "./routes/basic"
import { user } from "./routes/user"

const app = new Hono().basePath('/api').use(cors()).use(logger()).use(secureHeaders()).use(csrf())

app.all('/', (c) => c.text('Welcome to the Hono application'))
app.route('/basic', basic)
app.route('/user', user)

app.get('/json', async (c) => {
    const pathToFile = "./src/json/users.json"
    const data = async () => await (Bun.file(pathToFile)).json()

    let arr: any[] = await data()

    let user = {
        "id": "U0004",
        "name": "Joe",
        "email": "john@gmail.com",
        "phone": "+8562077883344",
        "address": {
            "village": "village",
            "district": "district",
            "province": "province"
        }
    }

    arr.push(user)

    await Bun.write(pathToFile, JSON.stringify(arr))

    return c.json(data)
})

app.notFound((c) => c.text('API Not Found'))

export default app