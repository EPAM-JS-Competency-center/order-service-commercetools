import { SNSHandler, SNSEvent } from "aws-lambda";
import { OrderProvider } from "providers";
import { Order } from "types/order";

const orderProvider = new OrderProvider();

export const handler: SNSHandler = async (event: SNSEvent) => {
  try {
    console.log("Lambda invocation with event: ", JSON.stringify(event));

    const order = JSON.parse(event.Records[0].Sns.Message) as Order;

    console.log("Order data for updating: ", order);

    const result = await orderProvider.updateOrder(order);

    console.log("Updating successful!", result);
  } catch (e) {
    console.error("Error encountered", e);
  }
};
