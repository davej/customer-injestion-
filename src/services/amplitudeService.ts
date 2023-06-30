```typescript
import axios from 'axios';
import { Event } from '../models/event';
import { config } from '../config';
import { errorHandler } from '../utils/errorHandler';
import { retryHandler } from '../utils/retryHandler';
import { EventModel } from '../database/models/eventModel';

export class AmplitudeService {
  private static instance: AmplitudeService;
  private eventModel: EventModel;

  private constructor() {
    this.eventModel = new EventModel();
  }

  public static getInstance(): AmplitudeService {
    if (!AmplitudeService.instance) {
      AmplitudeService.instance = new AmplitudeService();
    }

    return AmplitudeService.instance;
  }

  public async getEvents(): Promise<Event[]> {
    try {
      const response = await retryHandler(() => axios.get(`${config.amplitudeApiUrl}/events`, {
        headers: {
          'Authorization': `Bearer ${config.amplitudeApiKey}`
        }
      }));

      const events = response.data.map((event: any) => new Event(event));

      await Promise.all(events.map(event => this.eventModel.save(event)));

      return events;
    } catch (error) {
      errorHandler(error);
      return [];
    }
  }
}
```