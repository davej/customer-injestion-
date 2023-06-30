```typescript
import { Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import { retryHandler } from '../utils/retryHandler';
import { intercomService } from '../services/intercomService';
import { stripeService } from '../services/stripeService';
import { sentryService } from '../services/sentryService';
import { amplitudeService } from '../services/amplitudeService';

export class WebhookController {
  static async handleIntercomWebhook(req: Request, res: Response) {
    try {
      const data = req.body;
      await retryHandler(() => intercomService.ingestData(data));
      res.status(200).send();
    } catch (error) {
      errorHandler(error);
      res.status(500).send();
    }
  }

  static async handleStripeWebhook(req: Request, res: Response) {
    try {
      const data = req.body;
      await retryHandler(() => stripeService.ingestData(data));
      res.status(200).send();
    } catch (error) {
      errorHandler(error);
      res.status(500).send();
    }
  }

  static async handleSentryWebhook(req: Request, res: Response) {
    try {
      const data = req.body;
      await retryHandler(() => sentryService.ingestData(data));
      res.status(200).send();
    } catch (error) {
      errorHandler(error);
      res.status(500).send();
    }
  }

  static async handleAmplitudeWebhook(req: Request, res: Response) {
    try {
      const data = req.body;
      await retryHandler(() => amplitudeService.ingestData(data));
      res.status(200).send();
    } catch (error) {
      errorHandler(error);
      res.status(500).send();
    }
  }
}
```