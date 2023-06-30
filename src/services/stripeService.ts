import { Stripe } from 'stripe';
import { config } from '../config';
import { Customer, Subscription } from '../models';
import { CustomerModel, SubscriptionModel } from '../database/models';
import { errorHandler, retryHandler } from '../utils';

const stripe = new Stripe(config.stripeApiKey, { apiVersion: '2020-08-27' });

export class StripeService {
  private customerModel: CustomerModel;
  private subscriptionModel: SubscriptionModel;

  constructor() {
    this.customerModel = new CustomerModel();
    this.subscriptionModel = new SubscriptionModel();
  }

  async fetchCustomers(): Promise<void> {
    try {
      const customers = await stripe.customers.list();
      for (const customer of customers.data) {
        const customerData: Customer = {
          id: customer.id,
          email: customer.email,
          name: customer.name,
        };
        await retryHandler(() => this.customerModel.createOrUpdate(customerData));
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  async fetchSubscriptions(): Promise<void> {
    try {
      const subscriptions = await stripe.subscriptions.list();
      for (const subscription of subscriptions.data) {
        const subscriptionData: Subscription = {
          id: subscription.id,
          customerId: subscription.customer as string,
          status: subscription.status,
        };
        await retryHandler(() => this.subscriptionModel.createOrUpdate(subscriptionData));
      }
    } catch (error) {
      errorHandler(error);
    }
  }
}