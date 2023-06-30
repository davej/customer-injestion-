```typescript
export interface Subscription {
    id: string;
    customerId: string;
    planId: string;
    startDate: Date;
    endDate: Date;
    status: string;
}
```