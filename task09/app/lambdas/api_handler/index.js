const weatherClient = require('weather-client');

exports.handler = async (event) => {
  const path = event.rawPath || event.path;
  const method = event.requestContext?.http?.method || event.httpMethod;

  if (path === '/weather' && method === 'GET') {
    try {
      const weatherData = await weatherClient.getForecast();

      return {
        statusCode: 200,
        body: JSON.stringify(weatherData),
        headers: {
          'content-type': 'application/json'
        },
        isBase64Encoded: false
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Failed to retrieve weather data: ${err.message}` }),
        headers: {
          'content-type': 'application/json'
        },
        isBase64Encoded: false
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        statusCode: 400,
        message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
      }),
      headers: {
        'content-type': 'application/json'
      },
      isBase64Encoded: false
    };
  }
};
