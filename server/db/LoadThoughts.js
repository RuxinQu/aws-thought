const AWS = require("aws-sdk");
const fs = require("fs");
AWS.config.update({
  region: "us-west-2",
});
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
console.log("Importing thoughts into DynamoDB. Please wait.");
//The relative path for the fs.readFileSync function is relative to where the file is executed, not the path between files. In this case, the file path will work if this command is executed from the project's root directory.
const allUsers = JSON.parse(
  fs.readFileSync("./server/seed/users.json", "utf8")
);

allUsers.forEach((user) => {
  const params = {
    TableName: "Thoughts",
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought,
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add thought",
        user.username,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});
