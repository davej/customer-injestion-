```typescript
import { ErrorHandler } from './errorHandler';

export class RetryHandler {
  private static instance: RetryHandler;
  private maxRetries: number;
  private delay: number;

  private constructor() {
    this.maxRetries = 3;
    this.delay = 1000; // delay in ms
  }

  public static getInstance(): RetryHandler {
    if (!RetryHandler.instance) {
      RetryHandler.instance = new RetryHandler();
    }
    return RetryHandler.instance;
  }

  public async retry<T>(fn: () => Promise<T>): Promise<T> {
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        ErrorHandler.handle(error);
        await this.sleep(this.delay);
      }
    }
    throw new Error('Max retries exceeded');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```