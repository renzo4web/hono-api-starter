import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'

import apiKeyAuth from './middlewares/auth.js'
import { env } from './lib/env.js'
import exampleRoutes from './routes/example.js'

const app = new OpenAPIHono()

app.use('*', secureHeaders())
app.use('*', cors({ origin: env.CORS_ORIGIN ?? '*' }))
// app.use('/api/*', apiKeyAuth)

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Hono API Starter',
    version: '1.0.0',
    description:
      'Personal Hono + TypeScript starter for building documented APIs.',
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}`,
      description: 'Local development',
    },
  ],
})

app.route('/', exampleRoutes)

app.onError((err, c) => {
  console.error('Unhandled application error:', err)

  return c.json(
    {
      message: 'Internal Server Error',
    },
    500,
  )
})

app.notFound((c) => {
  return c.json(
    {
      message: 'Not Found',
    },
    404,
  )
})

export default app
