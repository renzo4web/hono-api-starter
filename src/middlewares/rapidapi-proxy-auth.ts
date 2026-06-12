import type { MiddlewareHandler } from 'hono'

import { env } from '../lib/env.js'

export const rapidApiProxyAuth: MiddlewareHandler = async (c, next) => {
  if (!env.RAPIDAPI_PROXY_SECRET) {
    await next()
    return
  }

  const proxySecret = c.req.header('X-RapidAPI-Proxy-Secret')

  if (!proxySecret || proxySecret !== env.RAPIDAPI_PROXY_SECRET) {
    return c.json(
      { message: 'Invalid or missing RapidAPI proxy secret' },
      403,
    )
  }

  await next()
}
