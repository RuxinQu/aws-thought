const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: "us-west-2",
  // endpoint: "http://localhost:8000",
});

// Define the table name and seed data
const tableName = "Thoughts";
const allUsers = require("../seed/users.json");

// Loop through the seed data and insert each item into the table
allUsers.forEach(async (user) => {
  const params = {
    TableName: tableName,
    Item: {
      username: { S: user.username },
      createdAt: { N: user.createdAt },
      thought: { S: user.thought },
    },
  };

  try {
    const data = await client.send(new PutItemCommand(params));
    console.log("Wrote items to table. Result:", data);
  } catch (err) {
    console.error("Unable to write items to table. Error:", err);
  }
});

// const {
//   DynamoDBClient,
//   BatchWriteItemCommand,
// } = require("@aws-sdk/client-dynamodb");

// const client = new DynamoDBClient({
//   region: "us-west-2", // Replace with the region of your choice
//   // endpoint: "http://localhost:8000", // Replace with the endpoint of your local DynamoDB instance
// });

// const allUsers = require("../seed/users.json");

// const params = {
//   RequestItems: {
//     Thoughts: allUsers.map((user) => ({
//       PutRequest: {
//         Item: {
//           username: { S: user.username },
//           createdAt: { N: user.createdAt },
//           thought: { S: user.thought },
//         },
//       },
//     })),
//   },
// };

// const command = new BatchWriteItemCommand(params);
// client.send(command, (err, data) => {
//   if (err) {
//     console.error("Unable to write items to table. Error:", err);
//   } else {
//     console.log("Wrote items to table. Result:", data);
//   }
// });
