import { SQSHandler, SQSEvent } from "aws-lambda";
import { OrderProvider } from "providers";
import { Order } from "types/order";

const orderProvider = new OrderProvider();

export const handler: SQSHandler = async (event: SQSEvent) => {
  try {
    console.log("Lambda invocation with event: ", JSON.stringify(event));

    const order = JSON.parse(
      JSON.parse(event.Records[0].body || "{}").Message || "{}"
    ) as Order;

    console.log("Order data for updating: ", order);

    const result = await orderProvider.updateOrder(order);

    console.log("Updating successful!", result);
  } catch (e) {
    console.error("Error encountered", e);
  }
};
