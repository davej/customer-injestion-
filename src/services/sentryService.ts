```typescript
import * as Sentry from '@sentry/node';
import { errorHandler } from '../utils/errorHandler';
import { retryHandler } from '../utils/retryHandler';
import { ErrorModel } from '../database/models/errorModel';
import config from '../config';

Sentry.init({ dsn: config.sentryDsn });

export class SentryService {
  private errorModel: ErrorModel;

  constructor() {
    this.errorModel = new ErrorModel();
  }

  async fetchErrors() {
    try {
      const errors = await retryHandler(() => Sentry.getCurrentHub().getClient().getEventProcessor());
      if (errors) {
        await this.errorModel.saveErrors(errors);
      }
    } catch (error) {
      errorHandler(error);
    }
  }
}
```