import AWS from "aws-sdk";
import { REGION } from "../constants";
import { Order } from "types/order";

type FakeOmsSNSTopicArn = "reserveOrderTopicArn" | "updateOrderTopicArn";

const sns = new AWS.SNS({
  region: REGION,
});

/**
 * Handle all communication with OMS system
 */
export class FakeOmsProvider {
  constructor(
    private readonly hookConf: { [N in FakeOmsSNSTopicArn]?: string }
  ) {}

  async reserveOrder(createOrderResults: Order) {
    const messageData = {
      Message: JSON.stringify(createOrderResults),
      TopicArn: this.hookConf.reserveOrderTopicArn,
    };

    console.log("Publishing message to Reserve Order SNS:", messageData);

    return sns.publish(messageData).promise();
  }

  async updateOrder(order: Order) {
    const messageData = {
      Message: JSON.stringify(order),
      TopicArn: this.hookConf.updateOrderTopicArn,
    };

    console.log("Publishing message to Update Order SNS:", messageData);

    return sns.publish(messageData).promise();
  }
}
