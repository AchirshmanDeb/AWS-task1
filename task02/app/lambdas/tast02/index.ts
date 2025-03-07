import { APIGatewayEvent, Context, Callback, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const method = event.httpMethod;

  if (method === 'GET' && path === '/hello') {
    return {
      statusCode: 200,
      body: JSON.stringify({status:200, message: 'Hello, World!' })
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status:400,
        error: `Bad Request - Path: ${path}, Method: ${method}`
      })
    };
  }
};
