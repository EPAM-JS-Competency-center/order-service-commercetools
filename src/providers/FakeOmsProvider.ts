import AWS, { SNS } from "aws-sdk";
import { Order } from "types/order";

const sns = new AWS.SNS();

/**
 * Handle all communication with OMS system
 */
export class FakeOmsProvider {
  constructor(private readonly omsSnsArn: string) {}

  async reserveOrder(createOrderResults: Order) {
    const messageData = {
      Message: JSON.stringify(createOrderResults),
      TopicArn: this.omsSnsArn,
      MessageAttributes: {
        status: {
          DataType: "String",
          StringValue: createOrderResults.state,
        },
      } as SNS.MessageAttributeMap,
    };

    console.log("Publishing message to Reserve Order SNS:", messageData);

    return sns
      .publish(messageData)
      .promise()
      .then((res) => console.log("Publishing Finished: OMS Reserve", res))
      .catch((e) => console.log("Publishing Failed: OMS Reserve", e));
  }

  async updateOrder(order: Order) {
    const messageData = {
      Message: JSON.stringify(order),
      TopicArn: this.omsSnsArn,
      MessageAttributes: {
        status: {
          DataType: "String",
          StringValue: order.state,
        },
      } as SNS.MessageAttributeMap,
    };

    console.log("Publishing message to Update Order SNS:", messageData);

    return sns
      .publish(messageData)
      .promise()
      .then((res) => console.log("Publishing Finished: CT Update", res))
      .catch((e) => console.log("Publishing Failed: CT Update", e));
  }
}
