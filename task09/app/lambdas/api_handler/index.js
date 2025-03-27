const https = require("https");

exports.handler = async (event) => {
    if (event.path !== "/weather" || event.httpMethod !== "GET") {
        return {
            statusCode: 400,
            body: JSON.stringify({
                statusCode: 400,
                message: `Bad request syntax or unsupported method. Request path: ${event.path}. HTTP method: ${event.httpMethod}`
            })
        };
    }

    const lat = event.queryStringParameters?.lat || "50.4375";
    const lon = event.queryStringParameters?.lon || "30.5";
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&current_weather=true`;

    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => resolve({ statusCode: 200, body: data }));
        }).on("error", () => resolve({ statusCode: 500, body: JSON.stringify({ message: "Failed to fetch weather data" }) }));
    });
};
