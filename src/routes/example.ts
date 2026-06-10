import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

const router = new OpenAPIHono()

const HealthResponseSchema = z
  .object({
    status: z.literal('ok'),
    timestamp: z.string().datetime(),
  })
  .openapi('HealthResponse')

const EchoRequestSchema = z
  .object({
    message: z.string().min(1),
  })
  .openapi('EchoRequest')

const EchoResponseSchema = z
  .object({
    echo: z.string(),
    receivedAt: z.string().datetime(),
  })
  .openapi('EchoResponse')

const healthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['Example'],
  summary: 'Service health check',
  responses: {
    200: {
      description: 'API is healthy.',
      content: {
        'application/json': {
          schema: HealthResponseSchema,
        },
      },
    },
  },
})

router.openapi(healthRoute, (c) => {
  return c.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    200,
  )
})

const echoRoute = createRoute({
  method: 'post',
  path: '/echo',
  tags: ['Example'],
  summary: 'Echo a message back to the caller',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: EchoRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Echo response payload.',
      content: {
        'application/json': {
          schema: EchoResponseSchema,
        },
      },
    },
  },
})

router.openapi(echoRoute, (c) => {
  const { message } = c.req.valid('json')

  return c.json(
    {
      echo: message,
      receivedAt: new Date().toISOString(),
    },
    200,
  )
})

export default router
