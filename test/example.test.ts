import { describe, expect, it } from 'vitest'

import app from '../src/app'

describe('GET /health', () => {
  it('returns a healthy response', async () => {
    const response = await app.request('/health')
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toMatchObject({
      status: 'ok',
    })
    expect(typeof body.timestamp).toBe('string')
  })
})
