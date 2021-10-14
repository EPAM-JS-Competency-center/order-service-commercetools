import { APIGatewayProxyResult } from 'aws-lambda';

const headers = {
  'Access-Control-Allow-Origin': '*',
};

export const HttpResponse = {
  badRequest: <T>(data: T = {} as T): APIGatewayProxyResult => ({
    statusCode: 400,
    body: JSON.stringify(data),
    headers,
  }),
  notFound: (): APIGatewayProxyResult => ({
    statusCode: 404,
    body: JSON.stringify({}),
    headers,
  }),
  success: <T>(data: T = {} as T): APIGatewayProxyResult => ({
    statusCode: 200,
    body: JSON.stringify(data),
    headers,
  }),
  serverError: <T>(data: T = {} as T): APIGatewayProxyResult => ({
    statusCode: 500,
    body: JSON.stringify(data),
    headers,
  }),
};
