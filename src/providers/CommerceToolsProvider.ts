// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createClient } from '@commercetools/sdk-client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import {
  Cart,
  createApiBuilderFromCtpClient,
  Order,
} from '@commercetools/typescript-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/typescript-sdk/dist/typings/generated/client/by-project-key-request-builder';
import fetch from 'node-fetch';
import { OrderDetails } from 'types/order-details';

export class CommerceToolsProvider {
  private api: ByProjectKeyRequestBuilder;

  constructor(env: { [key: string]: string }) {
    const {
      CTP_PROJECT_KEY,
      CTP_CLIENT_SECRET,
      CTP_CLIENT_ID,
      CTP_AUTH_URL,
      CTP_API_URL,
      CTP_SCOPES,
    } = env;

    const projectKey = CTP_PROJECT_KEY as string;

    const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
      host: CTP_AUTH_URL,
      projectKey,
      credentials: {
        clientId: CTP_CLIENT_ID,
        clientSecret: CTP_CLIENT_SECRET,
      },
      scopes: [CTP_SCOPES],
      fetch,
    });
    const httpMiddleware = createHttpMiddleware({
      host: CTP_API_URL,
      fetch,
    });
    const client = createClient({
      middlewares: [authMiddleware, httpMiddleware],
    });

    // Create an API root from API builder of commercetools platform client
    const apiRoot = createApiBuilderFromCtpClient(client);

    this.api = apiRoot.withProjectKey({ projectKey });
  }

  async createCart(orderDetails: OrderDetails): Promise<Cart> {
    console.log('CommerceToolsProvider: Creating Cart...');

    const res = await this.api
      .carts()
      .post({
        body: {
          currency: 'USD',
          shippingAddress: {
            country: 'US',
          },
          taxMode: 'Disabled',
          customLineItems: orderDetails.items,
        },
      })
      .execute();

    return res.body;
  }

  async createOrderByCart(cart: Cart): Promise<Order> {
    console.log('CommerceToolsProvider: Creating Order by Cart...');

    const res = await this.api
      .orders()
      .post({
        body: {
          id: cart.id,
          version: 1,
        },
      })
      .execute();

    return res.body;
  }

  async updateOrder(order: Order): Promise<Order> {
    console.log('CommerceToolsProvider: Updating Order State...');

    const res = await this.api
      .orders()
      .withId({ ID: order.id })
      .post({
        body: {
          version: order.version,
          actions: [{ action: 'changeOrderState', orderState: 'Complete' }],
        },
      })
      .execute();

    return res.body;
  }
}
