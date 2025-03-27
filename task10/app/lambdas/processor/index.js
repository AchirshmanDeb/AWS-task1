const AWS = require("aws-sdk");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const AWSXRay = require("aws-xray-sdk");

// Enable X-Ray tracing
AWSXRay.captureHTTPsGlobal(require("http"));
AWSXRay.captureHTTPsGlobal(require("https"));
const dynamoDB = AWSXRay.captureAWSClient(new AWS.DynamoDB.DocumentClient());

const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&hourly=temperature_2m&timezone=auto";
const TABLE_NAME = "Weather";

exports.handler = async (event) => {
    const segment = AWSXRay.getSegment(); // Capture main segment
    const subsegment = segment.addNewSubsegment("Fetching Weather Data");
    try {
        // Fetch weather data
        const response = await axios.get(OPEN_METEO_URL);
        const weatherData = response.data;
        subsegment.close(); // Close subsegment after fetching

        // Prepare item for DynamoDB
        const item = {
            id: uuidv4(),
            forecast: weatherData,
        };

        // Store in DynamoDB
        await dynamoDB.put({ TableName: TABLE_NAME, Item: item }).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Weather data stored successfully", data: item }),
        };
    } catch (error) {
        subsegment.addError(error);
        subsegment.close();
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch or store weather data" }),
        };
    }
};
