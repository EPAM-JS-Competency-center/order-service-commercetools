import { APIGatewayProxyHandler } from "aws-lambda";
import { HttpResponse } from "../helpers/HttpResponse";
import { FakeOmsProvider, OrderProvider } from "../providers";
import { v4 } from "uuid";
import { OMS_SNS_TOPIC_ARN } from "../constants";

const omsProvider = new FakeOmsProvider(OMS_SNS_TOPIC_ARN);
const orderProvider = new OrderProvider(omsProvider);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log("Lambda invocation with event: ", JSON.stringify(event));

    const order = JSON.parse(event.body as string);

    console.log("Order data: ", order);

    const result = await orderProvider.createOrder({ ...order, id: v4() });

    console.log("Order created: ", result);
    console.log("Order status: ", result.state);

    return HttpResponse.success(result);
  } catch (e) {
    console.error("Error encountered", e);
    return HttpResponse.serverError(e);
  }
};
