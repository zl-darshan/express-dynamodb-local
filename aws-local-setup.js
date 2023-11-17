// This is the local dynamo-db setup only.

import AWS from "aws-sdk";

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});

export const dynamoDB = new AWS.DynamoDB();

export const dynamoDBdocClient = new AWS.DynamoDB.DocumentClient();


/* alternate way to setup */


// import DynamoDBClient from "aws-sdk/clients/dynamodb.js"

// const config = {
//     region: "local",
//     endpoint: "http://localhost:8000"
// };

// export const dynamoDBdocClient = new DynamoDBClient(config);