require("dotenv").config();
const express = require("express");

const router = express.Router();
const bucketName = process.env.BUCKETEER_BUCKET_NAME;

// @route  GET api/config
// @desc   Load config
// @access Public
router.get("/", async (_req, res) => {
  try {
    const config = {
      fileUrl: `https://${bucketName}.s3.amazonaws.com/`,
    };
    return res.json(config);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
