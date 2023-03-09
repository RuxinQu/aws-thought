const express = require("express");
const router = express.Router();

const {
  DynamoDBClient,
  ScanCommand,
  QueryCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
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
router.post("/users", (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.json({ Added: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
