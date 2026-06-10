import type { MiddlewareHandler } from 'hono'

import { env } from '../lib/env.js'

const getConfiguredKeys = (): string[] => {
  return (env.API_KEYS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
}

export const apiKeyAuth: MiddlewareHandler = async (c, next) => {
  const allowedKeys = getConfiguredKeys()

  if (allowedKeys.length === 0) {
    await next()
    return
  }

  const providedKey = c.req.header('X-API-Key')

  if (!providedKey || !allowedKeys.includes(providedKey)) {
    return c.json(
      {
        message: 'Unauthorized',
      },
      401,
    )
  }

  await next()
}

export default apiKeyAuth
