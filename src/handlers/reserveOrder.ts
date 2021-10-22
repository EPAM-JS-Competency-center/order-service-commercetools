import { SQSHandler, SQSEvent } from 'aws-lambda';
import { FakeOmsProvider } from '../providers';
import { OMS_SNS_TOPIC_ARN } from '../constants';
import { OrderDetails } from 'types/order-details';
import { Order } from '@commercetools/typescript-sdk';

const omsProvider = new FakeOmsProvider(OMS_SNS_TOPIC_ARN);

export const handler: SQSHandler = async (event: SQSEvent) => {
  try {
    console.log(
      'Reserve Order Lambda: Incoming Event: ',
      JSON.stringify(event)
    );

    const order = JSON.parse(
      JSON.parse(event.Records[0].body || '{}').Message || '{}'
    ) as Order;

    console.log('Reserve Order Lambda: Order Details: ', order);

    /**
     * Immitation of reservation via our own OMS
     */
    const result = await new Promise<Order>((resolve) =>
      setTimeout(
        () => resolve({ ...order, orderState: 'Confirmed' } as Order),
        Math.random()
      )
    );

    console.log('Reserve Order Lambda: Reservation Successful!');

    await omsProvider.updateOrder(result);
  } catch (e) {
    console.error('Reserve Order Lambda: Error Encountered', e);
  }
};
