const https = require("https");

class OpenMeteoAPI {
    constructor() {
        this.baseURL = "https://api.open-meteo.com/v1/forecast";
    }

    fetchWeather(latitude, longitude) {
        return new Promise((resolve, reject) => {
            const url = `${this.baseURL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&current_weather=true`;

            https.get(url, (res) => {
                let data = "";
                res.on("data", chunk => (data += chunk));
                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(data);
                        if (!parsedData.hourly) {
                            return reject(new Error("Missing hourly data in response"));
                        }
                        resolve(parsedData);
                    } catch (error) {
                        reject(new Error("Invalid JSON response from Open-Meteo API"));
                    }
                });
            }).on("error", err => reject(err));
        });
    }
}

module.exports = new OpenMeteoAPI();
