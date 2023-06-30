import express from 'express';
import { config } from './config';
import { errorHandler } from './utils/errorHandler';
import { retryHandler } from './utils/retryHandler';
import { intercomService } from './services/intercomService';
import { stripeService } from './services/stripeService';
import { sentryService } from './services/sentryService';
import { amplitudeService } from './services/amplitudeService';
import { webhookController } from './controllers/webhookController';

const app = express();
app.use(express.json());

app.post('/webhook', webhookController);

const fetchData = async () => {
  try {
    const intercomData = await retryHandler(intercomService.fetchConversations, errorHandler);
    const stripeData = await retryHandler(stripeService.fetchCustomersAndSubscriptions, errorHandler);
    const sentryData = await retryHandler(sentryService.fetchErrors, errorHandler);
    const amplitudeData = await retryHandler(amplitudeService.fetchEvents, errorHandler);

    // Save data to Firestore
    await Promise.all([
      intercomData.save(),
      stripeData.save(),
      sentryData.save(),
      amplitudeData.save()
    ]);
  } catch (error) {
    errorHandler(error);
  }
};

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  fetchData();
});