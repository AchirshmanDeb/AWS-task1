const weatherClient = require('/opt/weather-client');

exports.handler = async (event) => {
  if (event.rawPath === "/weather" && event.requestContext?.http?.method === "GET") {
    const forecast = await weatherClient.getForecast();

    return {
      statusCode: 200,
      body: JSON.stringify(forecast), // 🔥 MAKE SURE THIS IS STRINGIFIED
      headers: {
        "content-type": "application/json"
      },
      isBase64Encoded: false
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        statusCode: 400,
        message: `Bad request syntax or unsupported method. Request path: ${event.rawPath}. HTTP method: ${event.requestContext?.http?.method}`
      }),
      headers: {
        "content-type": "application/json"
      },
      isBase64Encoded: false
    };
  }
};
