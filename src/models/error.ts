```typescript
export interface Error {
    id: string;
    message: string;
    timestamp: Date;
    platform: string;
    additionalData?: any;
}
```