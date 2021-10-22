import { Order } from '@commercetools/typescript-sdk';
import { SQSHandler, SQSEvent } from 'aws-lambda';
import { OrderProvider } from 'providers';
import { CommerceToolsProvider } from 'providers/CommerceToolsProvider';

const ctsProvider = new CommerceToolsProvider(
  process.env as { [key: string]: string }
);
const orderProvider = new OrderProvider(ctsProvider);

export const handler: SQSHandler = async (event: SQSEvent) => {
  try {
    console.log('Update Order Lambda: Invoking Event: ', JSON.stringify(event));

    const order = JSON.parse(
      JSON.parse(event.Records[0].body || '{}').Message || '{}'
    ) as Order;

    console.log('Update Order Lambda: Order Details: ', order);

    const result = await orderProvider.updateOrder(order);

    console.log('Update Order Lambda: Updating successful!', result);
  } catch (e) {
    console.error('Update Order Lambda: Error encountered', e);
  }
};
