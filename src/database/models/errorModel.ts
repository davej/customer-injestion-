import { firestore } from '../firestore';
import { Error } from '../../models/error';

class ErrorModel {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.collection = firestore.collection('errors');
  }

  async create(error: Error): Promise<void> {
    const docRef = this.collection.doc();
    await docRef.set({ ...error });
  }

  async update(errorId: string, error: Error): Promise<void> {
    const docRef = this.collection.doc(errorId);
    await docRef.update({ ...error });
  }

  async get(errorId: string): Promise<Error | null> {
    const docRef = this.collection.doc(errorId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    return doc.data() as Error;
  }

  async delete(errorId: string): Promise<void> {
    const docRef = this.collection.doc(errorId);
    await docRef.delete();
  }
}

export const errorModel = new ErrorModel();