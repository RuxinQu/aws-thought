const express = require("express");
const router = express.Router();
const multer = require("multer");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const paramsConfig = require("../utils/params-config");
require("dotenv").config();

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

// image is the key!
const upload = multer({ storage }).single("image");

const s3 = new S3Client({
  region: "us-west-2",
});

router.post("/image-upload", upload, async (req, res) => {
  const params = paramsConfig(req.file);
  const options = { partSize: 5 * 1024 * 1024, queueSize: 10 };
  try {
    await s3.send(new PutObjectCommand(params), options);
    const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
