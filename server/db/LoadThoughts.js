const {
  DynamoDBClient,
  BatchWriteItemCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-west-2", // Replace with the region of your choice
  endpoint: "http://localhost:8000", // Replace with the endpoint of your local DynamoDB instance
});

const allUsers = require("../seed/users.json");

const params = {
  RequestItems: {
    Thoughts: allUsers.map((user) => ({
      PutRequest: {
        Item: {
          username: { S: user.username },
          createdAt: { N: user.createdAt },
          thought: { S: user.thought },
        },
      },
    })),
  },
};

const command = new BatchWriteItemCommand(params);
client.send(command, (err, data) => {
  if (err) {
    console.error("Unable to write items to table. Error:", err);
  } else {
    console.log("Wrote items to table. Result:", data);
  }
});
