import { SNSHandler, SNSEvent } from "aws-lambda";
import { FakeOmsProvider } from "../providers";
import { CT_UPDATE_ORDER_SNS_TOPIC_ARN } from "../constants";
import { Order } from "types/order";

const omsProvider = new FakeOmsProvider({
  updateOrderTopicArn: CT_UPDATE_ORDER_SNS_TOPIC_ARN,
});

export const handler: SNSHandler = async (event: SNSEvent) => {
  try {
    console.log("Lambda invocation with event: ", JSON.stringify(event));

    const order = JSON.parse(event.Records[0].Sns.Message) as Order;

    console.log("Order data for reservation: ", order);

    /**
     * Immitation of reservation
     */
    const result = await new Promise((resolve) =>
      setTimeout(() => resolve(null), Math.random())
    );

    console.log("Reservation successful!");

    omsProvider.updateOrder(order);
  } catch (e) {
    console.error("Error encountered", e);
  }
};
