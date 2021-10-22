import { Order } from '@commercetools/typescript-sdk';
import { FakeOmsProvider } from 'providers';
import { OrderDetails } from '../types/order-details';
import { CommerceToolsProvider } from './CommerceToolsProvider';

/**
 * Handle all communication with the commerce tools
 */
export class OrderProvider {
  constructor(
    private readonly cts: CommerceToolsProvider,
    private readonly oms?: FakeOmsProvider
  ) {}

  async createOrder(orderDetails: OrderDetails): Promise<Order> {
    console.log('Order Provider: Create Order Invoking...');

    const cart = await this.cts.createCart(orderDetails);
    const order = await this.cts.createOrderByCart(cart);

    if (order.orderState == 'Open' && this.oms) {
      await this.oms.reserveOrder(order);
    }

    return order;
  }

  async updateOrder(order: Order) {
    console.log('Order Provider: Update Order Invoking...');

    return this.cts.updateOrder(order);
  }
}
