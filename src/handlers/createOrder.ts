import { APIGatewayProxyHandler } from 'aws-lambda';
import { HttpResponse } from '../helpers/HttpResponse';
import { FakeOmsProvider, OrderProvider } from '../providers';
import { OMS_SNS_TOPIC_ARN } from '../constants';
import { CommerceToolsProvider } from 'providers/CommerceToolsProvider';

const ctsProvider = new CommerceToolsProvider(
  process.env as { [key: string]: string }
);

const omsProvider = new FakeOmsProvider(OMS_SNS_TOPIC_ARN);
const orderProvider = new OrderProvider(ctsProvider, omsProvider);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log('Create Order Lambda: Incoming Event: ', JSON.stringify(event));

    const orderDetails = JSON.parse(event.body as string);

    console.log('Create Order Lambda: Order Details: ', orderDetails);

    const result = await orderProvider.createOrder(orderDetails);

    console.log('Create Order Lambda: Order Created: ', result);
    console.log('Create Order Lambda: Order Status: ', result.orderState);

    return HttpResponse.success(result);
  } catch (e) {
    console.error('Create Order Lambda: Error Encountered: ', e);
    return HttpResponse.serverError(e);
  }
};
