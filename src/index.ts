import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { csrf } from 'hono/csrf'

import { basic } from "./routes/basic"
import { user } from "./routes/user"

const app = new Hono().basePath('/api').use(cors()).use(logger()).use(secureHeaders()).use(csrf())

app.all('/', (c) => c.text('Welcome to the Hono application'))
app.route('/basic', basic)
app.route('/user', user)

app.get('/promise', async (c) => {
    const promise = () => new Promise((resolve, reject) => setTimeout(() => {
        resolve('Welcome to the Hono application')
    }, 3000))
    const value = await promise() as string
    return c.text(value)
})

app.notFound((c) => c.text('API Not Found'))

export default app