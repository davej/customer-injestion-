# Customer Data Ingestion

This application is designed to ingest customer data from various third-party platforms. It is built using Node.js and TypeScript, and stores data in a Firestore database.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your environment variables in `src/config.ts`
4. Run the application with `npm start`

## Pipelines

The application currently supports data ingestion from the following platforms:

- Intercom: Conversations data is fetched using the functions defined in `src/services/intercomService.ts`
- Stripe: Customer and subscription data is fetched using the functions defined in `src/services/stripeService.ts`
- Sentry: Error data is fetched using the functions defined in `src/services/sentryService.ts`
- Amplitude: Event data is fetched using the functions defined in `src/services/amplitudeService.ts`

## Webhooks

The application also supports real-time data updates via webhooks. The webhook handling functions are defined in `src/controllers/webhookController.ts`.

## Error Handling and Retries

The application is designed to be resilient. In case of errors, it will try again using the retry mechanism defined in `src/utils/retryHandler.ts`. All errors are handled using the function defined in `src/utils/errorHandler.ts`.

## Adding New Platforms

For instructions on how to add new platforms for data ingestion, please refer to `docs/ADDING_NEW_PLATFORMS.md`.

## Database Models

The application uses Firestore for data storage. The database models are defined in the following files:

- `src/database/models/customerModel.ts`
- `src/database/models/subscriptionModel.ts`
- `src/database/models/eventModel.ts`
- `src/database/models/errorModel.ts`

## Contributing

Contributions are welcome. Please submit a pull request or create an issue to discuss the changes you want to make.