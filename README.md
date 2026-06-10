# Hono API Starter

A personal Hono + TypeScript API starter template for building documented APIs with OpenAPI generation.

- Runtime: Node.js
- Framework: Hono
- Validation: Zod
- API docs: `@hono/zod-openapi`
- License: MIT
- Default branch: `main`

## Features
- Strict TypeScript setup
- Hono server entrypoint for Node.js
- OpenAPI document at `/openapi.json`
- Example `GET /health` and `POST /echo` routes
- Optional API key middleware using `X-API-Key`
- Docker-ready multi-stage build
- Vitest and ESLint configuration

## Quick start

### 1. Install dependencies
```bash
npm install
```

### 2. Create your env file
```bash
cp .env.example .env
```

### 3. Start the dev server
```bash
npm run dev
```

The API will be available at:
- `http://localhost:3000/health`
- `http://localhost:3000/openapi.json`

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Run the API in watch mode with `tsx` |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server |
| `npm run test` | Run Vitest |
| `npm run lint` | Lint `src/` with ESLint |
| `npm run format` | Format `src/` with Prettier |

## Project structure

```text
src/
  app.ts
  index.ts
  lib/
    env.ts
  middlewares/
    auth.ts
  routes/
    example.ts
```

## How to add endpoints

Create new route modules in `src/routes/` using `createRoute`.

Example pattern:

```ts
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

const router = new OpenAPIHono()

const route = createRoute({
  method: 'get',
  path: '/hello',
  responses: {
    200: {
      description: 'Hello world response',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z.string(),
            })
            .openapi('HelloResponse'),
        },
      },
    },
  },
})

router.openapi(route, (c) => {
  return c.json({ message: 'hello' }, 200)
})

export default router
```

Then mount it in `src/app.ts`:

```ts
import helloRoutes from './routes/hello.js'

app.route('/', helloRoutes)
```

## API key auth

The starter includes `src/middlewares/auth.ts`.

- It reads `API_KEYS` from the environment.
- Values are comma-separated.
- If `API_KEYS` is empty, auth is skipped for local development.
- When enabled, clients must send `X-API-Key`.

To apply it globally, add this in `src/app.ts`:

```ts
import apiKeyAuth from './middlewares/auth.js'

app.use('/api/*', apiKeyAuth)
```

Or apply it to a specific router before mounting.

## Testing with Vitest

You can test the app without starting a real server.

Example:

```ts
import { describe, expect, it } from 'vitest'
import app from '@/app.js'

describe('GET /health', () => {
  it('returns ok', async () => {
    const response = await app.request('/health')
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.status).toBe('ok')
  })
})
```

Run tests with:

```bash
npm run test
```

## Deployment

### Cloudflare Workers

This starter is structured so the app logic lives in `src/app.ts`, which can be reused for Workers.

Typical approach:
1. Add Wrangler: `npm install -D wrangler`
2. Create a Worker entrypoint that exports `app`
3. Add a `wrangler.toml`
4. Deploy with:

```bash
wrangler deploy
```

Minimal Worker entrypoint example:

```ts
import app from './src/app.js'

export default app
```

### Docker / Dokku

Build the image:

```bash
docker build -t hono-api-starter .
```

Run it locally:

```bash
docker run --rm -p 3000:3000 --env-file .env hono-api-starter
```

For Dokku, push the repo or image as you normally would and ensure your environment variables are configured.

### Node server

```bash
npm run build
npm start
```

## RapidAPI integration

RapidAPI works best when your API exposes a machine-readable contract.

Use:
- `GET /openapi.json` as the source OpenAPI definition
- `X-API-Key` middleware if you want simple key-based authentication behind your own gateway

Before publishing to RapidAPI:
1. Verify all endpoints are described with `createRoute`
2. Confirm request and response schemas are accurate
3. Check `/openapi.json`
4. Add production server metadata if needed

## Environment variables

See `.env.example` for all supported values.

- `PORT`: server port, defaults to `3000`
- `NODE_ENV`: `development`, `test`, or `production`
- `API_KEYS`: optional comma-separated API keys
- `LOG_LEVEL`: `debug`, `info`, `warn`, or `error`

## License

MIT
