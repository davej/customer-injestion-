import { firestore } from '../firestore';
import { Event } from '../../models/event';

export class EventModel {
    private static collection = firestore.collection('events');

    static async create(event: Event) {
        try {
            const docRef = await this.collection.add(event);
            return docRef.id;
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    static async update(eventId: string, event: Event) {
        try {
            await this.collection.doc(eventId).set(event, { merge: true });
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    }

    static async get(eventId: string): Promise<Event | null> {
        try {
            const doc = await this.collection.doc(eventId).get();
            if (doc.exists) {
                return doc.data() as Event;
            } else {
                console.log('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error getting document:', error);
            return null;
        }
    }

    static async delete(eventId: string) {
        try {
            await this.collection.doc(eventId).delete();
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    }
}