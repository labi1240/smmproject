import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

//
// 1. SERVER ENV VARIABLES
//
const server: Parameters<typeof createEnv>[0]['server'] = {
  // Already existing
  CLERK_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  CLERK_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
  RESEND_FROM: z.string().min(1).email(),
  DATABASE_URL: z.string().min(1).url(),
  RESEND_TOKEN: z.string().min(1).startsWith('re_'),
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
  BETTERSTACK_API_KEY: z.string().min(1).optional(),
  BETTERSTACK_URL: z.string().min(1).url().optional(),
  ARCJET_KEY: z.string().min(1).startsWith('ajkey_').optional(),
  ANALYZE: z.string().optional(),
  SVIX_TOKEN: z
    .union([
      z.string().min(1).startsWith('sk_'),
      z.string().min(1).startsWith('testsk_'),
    ])
    .optional(),
  LIVEBLOCKS_SECRET: z.string().min(1).startsWith('sk_').optional(),
  OPENAI_API_KEY: z.string().min(1).startsWith('sk-').optional(),
  BASEHUB_TOKEN: z.string().min(1).startsWith('bshb_pk_'),
  UPSTASH_REDIS_REST_URL: z.string().min(1).url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // Sentry (Vercel Marketplace)
  SENTRY_ORG: z.string().min(1).optional(),
  SENTRY_PROJECT: z.string().min(1).optional(),

  // Vercel
  VERCEL: z.string().optional(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

  // Flags & Blob
  FLAGS_SECRET: z.string().min(1).optional(),
  BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),

  // Uploadthing
  UPLOADTHING_TOKEN: z.string().min(1).optional(),

  //
  // ──────────────────────────────────────────────────────────────────────────────
  // NEW VARIABLES YOU ADDED
  // ──────────────────────────────────────────────────────────────────────────────
  //
  PULSE_API_KEY: z.string().min(1).optional(),
  NGROK: z.string().min(1).optional(),
  BETTER_AUTH_SECRET: z.string().min(1).optional(),
  TINYBIRD_API_KEY: z.string().min(1).optional(),
  TINYBIRD_API_URL: z.string().min(1).url().optional(),
  QSTASH_CURRENT_SIGNING_KEY: z.string().min(1).optional(),
  QSTASH_NEXT_SIGNING_KEY: z.string().min(1).optional(),
  QSTASH_TOKEN: z.string().min(1).optional(),
  JAP_API_KEY: z.string().min(1).optional(),
};

//
// 2. CLIENT ENV VARIABLES
//
const client: Parameters<typeof createEnv>[0]['client'] = {
  // Already existing
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
  NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
  NEXT_PUBLIC_API_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_DOCS_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).startsWith('G-').optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),

  //
  // ──────────────────────────────────────────────────────────────────────────────
  // NEW "NEXT_PUBLIC" VARIABLES
  // ──────────────────────────────────────────────────────────────────────────────
  //
  NEXT_PUBLIC_UPSTASH_REDIS_REST_URL: z.string().min(1).url().optional(),
  NEXT_PUBLIC_QSTASH_URL: z.string().min(1).url().optional(),
};

//
// 3. CREATE ENV
//
export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    // ───── Server ─────
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    RESEND_FROM: process.env.RESEND_FROM,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ANALYZE: process.env.ANALYZE,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    VERCEL: process.env.VERCEL,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    FLAGS_SECRET: process.env.FLAGS_SECRET,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    SVIX_TOKEN: process.env.SVIX_TOKEN,
    LIVEBLOCKS_SECRET: process.env.LIVEBLOCKS_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    BASEHUB_TOKEN: process.env.BASEHUB_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,

    // NEW Server env
    PULSE_API_KEY: process.env.PULSE_API_KEY,
    NGROK: process.env.NGROK,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    TINYBIRD_API_KEY: process.env.TINYBIRD_API_KEY,
    TINYBIRD_API_URL: process.env.TINYBIRD_API_URL,
    QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    JAP_API_KEY: process.env.JAP_API_KEY,

    // ───── Client ─────
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,

    // NEW "NEXT_PUBLIC" env
    NEXT_PUBLIC_UPSTASH_REDIS_REST_URL:
      process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL,
    NEXT_PUBLIC_QSTASH_URL: process.env.NEXT_PUBLIC_QSTASH_URL,
  },
});
