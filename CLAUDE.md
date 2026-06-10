# CLAUDE.md

Follow `./AGENTS.md` as the primary project guide.

## Conventions
- Use strict TypeScript only.
- Validate request, response, and environment boundaries with Zod.
- Prefer functional patterns and small pure helpers.
- Do not introduce classes unless explicitly requested.
- Keep route definitions OpenAPI-first with `createRoute`.
- Favor explicit imports and small modules.
