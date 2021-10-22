import { Order } from '@commercetools/typescript-sdk';
import AWS, { SNS } from 'aws-sdk';

const sns = new AWS.SNS();

/**
 * Handle all communication with OMS system
 */
export class FakeOmsProvider {
  constructor(private readonly omsSnsArn: string) {}

  async reserveOrder(order: Order) {
    const messageData = {
      Message: JSON.stringify(order),
      TopicArn: this.omsSnsArn,
      MessageAttributes: {
        status: {
          DataType: 'String',
          StringValue: order.orderState,
        },
      } as SNS.MessageAttributeMap,
    };

    console.log(
      'OMS Provider: Publishing message to Reserve Order SNS:',
      messageData
    );

    return sns
      .publish(messageData)
      .promise()
      .then((res) =>
        console.log('OMS Provider: Publishing Reserve Order Successful!', res)
      )
      .catch((e) =>
        console.log('OMS Provider: Publishing Reserve Order Failed!', e)
      );
  }

  async updateOrder(order: Order) {
    const messageData = {
      Message: JSON.stringify(order),
      TopicArn: this.omsSnsArn,
      MessageAttributes: {
        status: {
          DataType: 'String',
          StringValue: order.orderState,
        },
      } as SNS.MessageAttributeMap,
    };

    console.log(
      'OMS Provider: Publishing message to Update Order SNS:',
      messageData
    );

    return sns
      .publish(messageData)
      .promise()
      .then((res) =>
        console.log('OMS Provider: Publishing Update Order Successful!', res)
      )
      .catch((e) =>
        console.log('OMS Provider: Publishing Update Order Failed', e)
      );
  }
}
