```typescript
import { firestore } from 'firebase-admin';
import { Subscription } from '../../models/subscription';

const db = firestore();

export class SubscriptionModel {
    private static collection = db.collection('subscriptions');

    static async create(subscription: Subscription): Promise<void> {
        await this.collection.doc(subscription.id).set(subscription);
    }

    static async update(subscription: Subscription): Promise<void> {
        await this.collection.doc(subscription.id).update(subscription);
    }

    static async get(id: string): Promise<Subscription | null> {
        const doc = await this.collection.doc(id).get();
        return doc.exists ? (doc.data() as Subscription) : null;
    }

    static async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}
```