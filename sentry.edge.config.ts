import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f9739f5250080c321f04239531152d60@o4511583962333184.ingest.us.sentry.io/4511736274944000",

  enabled:
    process.env.NODE_ENV === "production" &&
    process.env.SENTRY_DSN !== undefined,

  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
});
