import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_KEYS: z
    .string()
    .optional()
    .transform((value) => (value?.trim() ? value : undefined)),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  CORS_ORIGIN: z.string().optional().default('*'),
  PUBLIC_URL: z.string().optional(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid environment configuration.')
  console.error('Please review the following environment variable errors:')
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2))
  process.exit(1)
}

export const env = parsedEnv.data

export type Env = z.infer<typeof envSchema>
