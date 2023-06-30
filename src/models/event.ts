```typescript
export interface Event {
    id: string;
    eventType: string;
    userId: string;
    timestamp: Date;
    properties: Record<string, any>;
}
```