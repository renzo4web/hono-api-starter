# AGENTS.md

## Project overview
- Personal Hono + TypeScript API starter for building and documenting HTTP APIs.
- Designed for RapidAPI-friendly publishing via an automatically generated `openapi.json` document.
- Runtime target is Node.js using `@hono/node-server`.

## Architecture
- `src/app.ts`: app composition, middleware registration, OpenAPI document endpoint, route mounting.
- `src/index.ts`: Node server entrypoint.
- `src/routes/`: feature routes defined with `createRoute` and Zod schemas.
- `src/middlewares/`: reusable request middleware such as API key auth.
- `src/lib/`: shared utilities such as validated environment config.

## How to add endpoints
1. Create or update a route module in `src/routes/`.
2. Use `createRoute` from `@hono/zod-openapi`.
3. Define request and response schemas with Zod.
4. Register the route with `router.openapi(...)`.
5. Mount the router from `src/app.ts`.
6. Confirm the schema appears in `/openapi.json`.

## Testing
- Use Vitest for unit and integration tests.
- Place tests near source files or under a dedicated `test/` directory.
- Prefer testing route handlers through `app.request(...)` to avoid starting a real server.

## Deployment options
- Local Node server via `npm run dev` or `npm start`.
- Docker using the included `Dockerfile`.
- Dokku or any container platform that accepts a Docker image.
- Cloudflare Workers by reusing `src/app.ts` with a Worker-compatible entrypoint.

## Coding notes for agents
- Keep TypeScript strict and avoid `any`.
- Validate all external input with Zod.
- Prefer small, composable route modules.
- Keep middleware pure and reusable.
