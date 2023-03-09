const express = require("express");
const router = express.Router();

const {
  DynamoDBClient,
  ScanCommand,
  QueryCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-west-2",
  // endpoint: "http://localhost:8000",
});
const table = "Thoughts";

router.get("/users", async (req, res) => {
  const params = {
    TableName: table,
  };
  try {
    // Scan return all items in the table
    const data = await client.send(new ScanCommand(params));
    res.status(200).json(data.Items);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get thoughts from a user
router.get("/users/:username", async (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);
  const params = {
    TableName: table,
    ProjectionExpression: "#th, #ca, #un",
    KeyConditionExpression: "#un = :user",
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought",
    },
    ExpressionAttributeValues: {
      ":user": req.params.username,
    },
    ScanIndexForward: false,
  };
  const command = new QueryCommand(params);
  try {
    const data = await client.send(QueryCommand(command));
    console.log("Query succeeded.");
    res.json(data.Items);
  } catch (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    res.status(500).json(err.message);
  }
});

// Create new user
router.post("/users", async (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: { S: req.body.username },
      thought: { S: req.body.thought },
      // when we use the putItem or updateItem API to write a Number value to a Number attribute,
      // we need to wrap the numeric value with quotes because these APIs require the attribute values to be strings.

      // When we retrieve the value of a Number attribute using the getItem or query API, the value is returned as a numeric value,
      // not as a string. We don't need to wrap the numeric value with quotes in this case.
      createdAt: { N: `${Date.now()}` },
    },
  };
  console.log(params);
  try {
    const data = await client.send(new PutItemCommand(params));
    console.log("Successfully inserted item:", data);
  } catch (err) {
    console.error("Error inserting item:", err.message);
  }
});

module.exports = router;
