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
                res.on("end", () => resolve(JSON.parse(data)));
            }).on("error", err => reject(err));
        });
    }
}

module.exports = new OpenMeteoAPI();
