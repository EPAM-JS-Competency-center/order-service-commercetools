import { SQSHandler, SQSEvent } from "aws-lambda";
import { FakeOmsProvider } from "../providers";
import { OMS_SNS_TOPIC_ARN } from "../constants";
import { Order } from "types/order";

const omsProvider = new FakeOmsProvider(OMS_SNS_TOPIC_ARN);

export const handler: SQSHandler = async (event: SQSEvent) => {
  try {
    console.log("Lambda invocation with event: ", JSON.stringify(event));

    const order = JSON.parse(
      JSON.parse(event.Records[0].body || "{}").Message || "{}"
    ) as Order;

    console.log("Order data for reservation: ", order);

    /**
     * Immitation of reservation
     */
    const result = await new Promise<Order>((resolve) =>
      setTimeout(
        () => resolve({ ...order, state: "reserved" } as Order),
        Math.random()
      )
    );

    console.log("Reservation successful!");

    omsProvider.updateOrder(result);
  } catch (e) {
    console.error("Error encountered", e);
  }
};
