const axios = require('/opt/nodejs/axios'); // Import axios from Lambda Layer

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=50.4375&longitude=30.5&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&current_weather=true';

exports.handler = async (event) => {
    try {
        // Validate that the request is for /weather and is a GET request
        if (event.requestContext.http.method !== 'GET' || event.rawPath !== '/weather') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    statusCode: 400,
                    message: `Bad request syntax or unsupported method. Request path: ${event.rawPath}. HTTP method: ${event.requestContext.http.method}`
                }),
                headers: { 'content-type': 'application/json' },
                isBase64Encoded: false
            };
        }

        // Fetch weather data from Open-Meteo API
        const response = await axios.get(OPEN_METEO_URL);
        const data = response.data;

        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' },
            isBase64Encoded: false
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
            headers: { 'content-type': 'application/json' },
            isBase64Encoded: false
        };
    }
};
