```typescript
export interface Customer {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  intercomConversations: Array<IntercomConversation>;
  stripeSubscriptions: Array<StripeSubscription>;
  sentryErrors: Array<SentryError>;
  amplitudeEvents: Array<AmplitudeEvent>;
}

interface IntercomConversation {
  id: string;
  createdAt: Date;
  body: string;
  type: string;
}

interface StripeSubscription {
  id: string;
  status: string;
  plan: string;
  startDate: Date;
  endDate: Date;
}

interface SentryError {
  id: string;
  message: string;
  level: string;
  timestamp: Date;
}

interface AmplitudeEvent {
  id: string;
  eventType: string;
  eventProperties: object;
  userProperties: object;
  timestamp: Date;
}
```