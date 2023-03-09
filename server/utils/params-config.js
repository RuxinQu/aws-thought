const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: process.env.S3_BUCKET,
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
  };

  return imageParams;
};

module.exports = params;
