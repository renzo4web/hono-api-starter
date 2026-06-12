import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'

import apiKeyAuth from './middlewares/auth.js'
import { rapidApiProxyAuth } from './middlewares/rapidapi-proxy-auth.js'
import { env } from './lib/env.js'
import v1Example from './routes/v1/example.js'

const app = new OpenAPIHono()

app.use('*', secureHeaders())
app.use('*', cors({ origin: env.CORS_ORIGIN ?? '*' }))
// app.use('/api/*', apiKeyAuth)
// app.use('/v1/*', rapidApiProxyAuth)

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Hono API Starter',
    version: '1.0.0',
    description: 'Personal Hono + TypeScript starter for building documented APIs. Versioned routes. RapidAPI-ready.',
  },
  servers: [
    {
      url: env.BASE_URL ?? `http://localhost:${env.PORT}`,
      description: 'Current environment',
    },
  ],
})

app.route('/v1', v1Example)

export default app
