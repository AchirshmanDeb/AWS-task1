// handler.js

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// Initialize DynamoDB Client
const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

// Table name (can also use process.env.TABLE_NAME if set via environment variable)
const TABLE_NAME = "EventsTable";

export const handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const id = uuidv4();
    const createdAt = new Date().toISOString();

    const eventItem = {
      id,
      principalId: body.principalId,
      createdAt,
      body: body.content
    };

    // Save to DynamoDB
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: eventItem
    });

    await ddb.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({ statusCode: 201, event: eventItem })
    };
  } catch (err) {
    console.error("Error saving event:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" })
    };
  }
};
