import { z } from 'zod'

/**
 * Environment variable schema validation
 * This ensures all required environment variables are present and valid
 */
const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

type Env = z.infer<typeof envSchema>

/**
 * Get validated environment variables
 * Validates at runtime when called, not at module load time
 * This allows the build to succeed even if env vars aren't set
 */
function getEnv(): Env {
  try {
    return envSchema.parse({
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      NODE_ENV: process.env.NODE_ENV || 'development',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => issue.path.join('.')).join(', ')
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}\n` +
        'Please check your .env.local file and ensure all required variables are set.'
      )
    }
    throw error
  }
}

/**
 * Lazy-loaded environment variables
 * Only validates when accessed, allowing builds to succeed without env vars
 */
export function getEnvVar(key: keyof Env): string {
  const env = getEnv()
  return env[key]
}

/**
 * Get all environment variables (validates on first access)
 */
export const env = new Proxy({} as Env, {
  get(_target, prop: keyof Env) {
    return getEnv()[prop]
  },
})

