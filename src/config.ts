```typescript
export const config = {
    intercom: {
        apiKey: process.env.INTERCOM_API_KEY || '',
        appId: process.env.INTERCOM_APP_ID || ''
    },
    stripe: {
        apiKey: process.env.STRIPE_API_KEY || ''
    },
    sentry: {
        dsn: process.env.SENTRY_DSN || ''
    },
    amplitude: {
        apiKey: process.env.AMPLITUDE_API_KEY || ''
    },
    firestore: {
        projectId: process.env.FIRESTORE_PROJECT_ID || '',
        privateKey: process.env.FIRESTORE_PRIVATE_KEY || '',
        clientEmail: process.env.FIRESTORE_CLIENT_EMAIL || ''
    },
    webhook: {
        secret: process.env.WEBHOOK_SECRET || ''
    }
};
```