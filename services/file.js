const AWS = require("aws-sdk");

process.env.AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY;
process.env.AWS_REGION = "us-east-1";

const bucketName = process.env.BUCKETEER_BUCKET_NAME;
const s3 = new AWS.S3();

const upload = async (buffer, key, contentType) => {
  const params = {
    Key: key,
    Bucket: bucketName,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read",
  };
  await new Promise((res, rej) =>
    s3.putObject(params, (error) => {
      if (error) {
        console.error("Error uploading file:", error);
        rej(error);
      }
      res();
    })
  );
};

const remove = async (key) => {
  var params = {
    Key: key,
    Bucket: bucketName,
  };
  await new Promise((res, rej) =>
    s3.deleteObject(params, (error) => {
      if (error) {
        console.error("Error removing file:", error);
        rej(error);
      }
      res();
    })
  );
};

module.exports = {
  upload,
  remove,
};
