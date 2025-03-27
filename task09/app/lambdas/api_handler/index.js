const OpenMeteoAPI = require("../layers/weather_sdk/api"); // Use the Layer

exports.handler = async (event) => {
    const { path, httpMethod, queryStringParameters } = event;

    if (path !== "/weather" || httpMethod !== "GET") {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${httpMethod}`
            })
        };
    }

    const latitude = queryStringParameters?.lat || "50.4375";
    const longitude = queryStringParameters?.lon || "30.5";

    try {
        const weatherData = await OpenMeteoAPI.fetchWeather(latitude, longitude);
        return {
            statusCode: 200,
            body: JSON.stringify(weatherData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to fetch weather data", error: error.message })
        };
    }
};
