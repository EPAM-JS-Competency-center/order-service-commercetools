import { FakeOmsProvider } from "providers";
import { Order } from "../types/order";

/**
 * Handle all communication with the commerce tools
 */
export class OrderProvider {
  constructor(private readonly oms?: FakeOmsProvider) {}

  async createOrder(order: Order): Promise<Order> {
    console.log("Order Provider: create order invoking");

    // TODO: integration with commercetools
    const createOrderResults = await new Promise<Order>((resolve) =>
      setTimeout(
        () => resolve({ ...order, state: "created" } as Order),
        Math.random()
      )
    );

    if ((createOrderResults.state = "created") && this.oms) {
      console.log("Order Provider: reserve order invoking via oms system");

      this.oms.reserveOrder(createOrderResults);
    }

    return createOrderResults;
  }

  async updateOrder(order: Order) {
    // TODO: integration with commercetools
    return order;
  }
}
