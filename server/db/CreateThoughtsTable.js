const {
  DynamoDBClient,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
  region: "us-west-2",
  //for dynamodb local
  // endpoint: "http://localhost:8000",
});

const params = {
  TableName: "Thoughts",
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH" }, // Partition key
    { AttributeName: "createdAt", KeyType: "RANGE" }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" },
    { AttributeName: "createdAt", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};
const command = new CreateTableCommand(params);
client.send(command, (err, data) => {
  if (err) {
    console.error("Unable to create table. Error:", err);
  } else {
    console.log("Created table. Table description:", data.TableDescription);
  }
});
