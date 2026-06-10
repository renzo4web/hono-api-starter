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

## Installed skills.sh skills (for coding agents)
These skills are installed in `.agents/skills/` and auto-loaded by Pi (Claude Code), Cursor, Copilot, etc.

| Skill | Source | Purpose |
|-------|--------|---------|
| **workers-best-practices** | `cloudflare/skills` | Cloudflare Workers optimization, limits, KV, D1, R2 patterns |
| **wrangler** | `cloudflare/skills` | Wrangler CLI: deploy, secrets, env, wrangler.toml config |
| **api-design-principles** | `wshobson/agents` | RESTful conventions, resource modeling, error responses, versioning |
| **typescript-advanced-types** | `wshobson/agents` | TypeScript generics, conditional types, mapped types, strict patterns |
| **javascript-testing-patterns** | `wshobson/agents` | Vitest patterns, mocking, integration tests for JS/TS APIs |
| **test-driven-development** | `obra/superpowers` | TDD loop: RED → GREEN → REFACTOR, write tests before implementation |
| **docker-expert** | `sickn33/antigravity-awesome-skills` | Docker multi-stage builds, health checks, production Dockerfile patterns |
