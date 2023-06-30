import { firestore } from '../firestore';
import { Customer } from '../../models/customer';

export class CustomerModel {
  private static collection = firestore.collection('customers');

  static async create(customer: Customer): Promise<void> {
    await this.collection.doc(customer.id).set(customer);
  }

  static async update(customer: Customer): Promise<void> {
    await this.collection.doc(customer.id).update(customer);
  }

  static async get(id: string): Promise<Customer | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as Customer) : null;
  }

  static async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}