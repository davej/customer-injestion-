# Adding New Platforms

To add a new platform for data ingestion, follow the steps below:

1. **Create a new service file**: Create a new TypeScript file in the `src/services` directory. This file should contain functions to fetch data from the new platform's API. Use the existing service files (`intercomService.ts`, `stripeService.ts`, `sentryService.ts`, `amplitudeService.ts`) as a reference.

2. **Update the config file**: Add the new platform's API keys and other necessary configurations to the `src/config.ts` file.

3. **Create a new model file**: Create a new TypeScript file in the `src/models` directory. This file should define the data structure for the new platform's data. Use the existing model files (`customer.ts`, `subscription.ts`, `event.ts`, `error.ts`) as a reference.

4. **Create a new database model file**: Create a new TypeScript file in the `src/database/models` directory. This file should contain functions to interact with Firestore for storing the new platform's data. Use the existing database model files (`customerModel.ts`, `subscriptionModel.ts`, `eventModel.ts`, `errorModel.ts`) as a reference.

5. **Update the main file**: Update the `src/main.ts` file to call the functions from the new service file.

6. **Update the webhook controller**: If the new platform supports webhooks for real-time data updates, update the `src/controllers/webhookController.ts` file to handle these webhooks.

7. **Error Handling and Retry Mechanism**: Make sure to use the generic error handling function from `src/utils/errorHandler.ts` and the retry function from `src/utils/retryHandler.ts` in your new service file to handle errors and retry failed operations.

Remember to test your code thoroughly to ensure that data from the new platform is being ingested correctly.